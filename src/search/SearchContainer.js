// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { GET } from '../state/constants';
import { apiCall } from '../services/apiActions';
import { setSearchResults, setSearchFieldValue, setCurrentSearchList } from './state/SearchActions';
import SearchScreen from './screens/SearchScreen';

type Props = {
  navigation: any,
  currentList: Object,
  currentSearchList: Object,
  searchResults: Array<Object>,
  searchFieldValue: string,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
  handleItemsSearch: (number, string) => void,
  handleSetSearchFieldValue: (string) => void,
  handleSetCurrentSearchList: (list: Object) => void,
}

class SearchContainer extends Component<Props> {
  componentDidMount = () => {
    if (this.props.currentSearchList !== this.props.currentList) {
      this.props.handleSetSearchFieldValue('');
      this.props.handleSetCurrentSearchList(this.props.currentList);
    }
    this.debouncedItemsSearch = _.debounce(this.props.handleItemsSearch, 500);
  }

  onSearchChange = (value: string) => {
    const listId = this.props.currentList.id;
    this.props.handleSetSearchFieldValue(value);
    this.debouncedItemsSearch(listId, value);
  }

  handleResultSelect = (data: Object) => {
    this.props.onResultSelect(data);
    this.onSearchChange(this.props.searchFieldValue); // refetch search items
  }

  handleItemDelete = (id: number) => {
    this.props.onItemDelete(id);
    this.onSearchChange(this.props.searchFieldValue); // refetch search items
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
        onResultSelect={this.handleResultSelect}
        onItemDelete={this.handleItemDelete}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.itemsReducer.currentList,
  currentSearchList: state.searchReducer.currentList,
  searchResults: state.searchReducer.results,
  searchFieldValue: state.searchReducer.value,
});

const mapDispatchToProps = dispatch => ({
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  handleSetCurrentSearchList: list => dispatch(setCurrentSearchList(list)),
  handleItemsSearch: (listId, query) => {
    dispatch(apiCall(`/lists/${listId}/items/?name=${query}`, setSearchResults, GET));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
