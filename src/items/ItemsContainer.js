// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, editItem, setCurrentListAndFetchItems } from './state/ItemsActions';
import BaseHeader from '../common/BaseHeader';
import ItemsScreen from './screens/ItemsScreen';
import LoadableContent from '../common/LoadableContent';

type Props = {
  navigation: any,
  currentList: Object,
  items: Object,
  lists: Object,
  handleSetCurrentList: (number) => void,
  handleItemAdd: (number, Object) => void,
  handleItemDelete: (number, number) => void,
  handleItemEdit: (number, number, Object) => void,
}

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.navigation.getParam('listId');
    this.props.handleSetCurrentList(listId);
  }
  onItemStateChange = (item, desiredState) => {
    const listId = this.props.currentList.id;
    const { id } = item;
    const data = { state: desiredState };
    this.props.handleItemEdit(listId, id, data);
  }

  render() {
    const {
      navigation, currentList, items, lists,
    } = this.props;
    return (
      <Container>
        {currentList && <BaseHeader navigation={navigation} headerText={currentList.name} hasGoBack /> }
        <LoadableContent>
          { items.length > 0 &&
            <ItemsScreen
              navigation={navigation}
              currentList={currentList}
              items={items}
              lists={lists}
              onItemStateChange={this.onItemStateChange}
            />
          }
        </LoadableContent>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  lists: state.listsReducer.lists,
  currentList: state.itemsReducer.currentList,
});

const mapDispatchToProps = dispatch => ({
  handleSetCurrentList: id => dispatch(apiCall(`/lists/${id}`, setCurrentListAndFetchItems, GET)),
  handleItemAdd: (listId, data) => dispatch(apiCall(`/lists/${listId}/items`, addItem, POST, data)),
  handleItemDelete: (listId, id) => {
    dispatch(apiCall(`/lists/${listId}/items/${String(id)}`, () => removeItem(id), DELETE));
  },
  handleItemEdit: (listId, id, data) => {
    dispatch(apiCall(`/lists/${listId}/items/${id}`, editItem, PUT, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
