// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { GET } from '../state/constants';
import { apiCall } from '../services/apiActions';
import { setSearchResults, setSearchFieldValue } from './state/SearchActions';
import SearchScreen from './screens/SearchScreen';

type Props = {
  navigation: any,
  currentList: Object,
  searchResults: Array<Object>,
  searchFieldValue: string,
  // onResultSelect: (data: Object) => void,
  // onItemDelete: (id: number) => void,
  handleItemsSearch: (number, string) => void,
  handleSetSearchFieldValue: (string) => void,
}

class SearchContainer extends Component<Props> {
  componentDidMount = () => {
    // this.props.handleSetSearchFieldValue('');
    this.debouncedItemsSearch = _.debounce(this.props.handleItemsSearch, 500);
  }

  onSearchChange = (value: string) => {
    const listId = this.props.currentList.id;
    this.props.handleSetSearchFieldValue(value);
    this.debouncedItemsSearch(listId, value);
  }

  debouncedItemsSearch: ((number: any, string: any) => void) & _.Cancelable

  render() {
    const {
      currentList, navigation, searchResults, searchFieldValue,
    } = this.props;
    return (
      <SearchScreen
        currentList={currentList}
        navigation={navigation}
        searchResults={searchResults}
        searchFieldValue={searchFieldValue}
        onChangeText={this.onSearchChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.itemsReducer.currentList,
  searchResults: state.searchReducer.results,
  searchFieldValue: state.searchReducer.value,
});

const mapDispatchToProps = dispatch => ({
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  handleItemsSearch: (listId, query) => {
    dispatch(apiCall(`/lists/${listId}/items/?name=${query}`, setSearchResults, GET));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
