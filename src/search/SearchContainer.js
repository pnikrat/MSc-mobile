// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { GET } from '../state/constants';
import { apiCall } from '../services/apiActions';
// import { setSearchResults, setSearchFieldValue,
//   setSearchMenuVisibility, changeSearchResultFocus } from './SearchActions';
import SearchScreen from './screens/SearchScreen';

type Props = {
  navigation: any,
  currentList: Object,
  // displayResults: boolean,
  // cursor: number,
  // placeholder?: string,
  // searchFieldValue: string,
  // searchResults: Array<Object>,
  // onResultSelect: (data: Object) => void,
  // onItemDelete: (id: number) => void,
  // handleItemsSearch: (Number, string) => void,
  // handleSetSearchFieldValue: (string) => void,
  // handleSetSearchMenuVisibility: (boolean) => void,
  // handleSearchFocus: (number) => void,
}

class SearchContainer extends Component<Props> {
  componentDidMount = () => {
    // this.props.handleSetSearchFieldValue('');
    // this.debouncedItemsSearch = _.debounce(this.props.handleItemsSearch, 500);
  }

  onSearchChange = (event, data) => {
    const listId = this.props.currentList.id;
    const { value } = data;
    // this.props.handleSetSearchFieldValue(value);
    this.debouncedItemsSearch(listId, value);
  }

  debouncedItemsSearch: ((Number: any, string: any) => void) & _.Cancelable

  render() {
    const {
      currentList, navigation,
      // placeholder, onResultSelect, searchFieldValue,
      // onItemDelete, displayResults, searchResults, currentList,
    } = this.props;
    return (
      <SearchScreen
        currentList={currentList}
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.itemsReducer.currentList,
  // searchResults: state.searchReducer.results,
  // displayResults: state.searchReducer.open,
  // searchFieldValue: state.searchReducer.value,
  // cursor: state.searchReducer.cursor,
});

const mapDispatchToProps = dispatch => ({
  // handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  // handleSetSearchMenuVisibility: value => dispatch(setSearchMenuVisibility(value)),
  // handleItemsSearch: (listId, query) => {
  //   dispatch(apiCall(`/lists/${listId}/items/?name=${query}`, setSearchResults, GET));
  // },
  // handleSearchFocus: value => dispatch(changeSearchResultFocus(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
