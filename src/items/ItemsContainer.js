// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Button, Icon, Container } from 'native-base';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, editItem,
  setCurrentListAndFetchItems, massUpdateItems, massMoveItems } from './state/ItemsActions';
import BaseHeader from '../common/BaseHeader';
import ItemsScreen from './screens/ItemsScreen';
import LoadableContent from '../common/LoadableContent';
import ListSubscription from '../websockets/ListSubscription';

type Props = {
  navigation: any,
  currentList: Object,
  items: Object,
  lists: Object,
  isRemoveBoughtDisabled: boolean,
  isMoveMissingDisabled: boolean,
  rawDispatch: (Object) => void,
  clearForm: () => void,
  handleSetCurrentList: (number) => void,
  handleItemAdd: (number, Object) => void,
  handleItemDelete: (number, number) => void,
  handleItemEdit: (number, number, Object) => void,
  handleRemoveBoughtItems: (number, Object) => void,
  handleMoveMissingItems: (number, Object) => void,
}

const byState = (x: Object, state: string) => x.filter(i => i.aasm_state === state);

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.navigation.getParam('listId');
    this.props.handleSetCurrentList(listId);

    this.listChannel = new ListSubscription(listId, this.props.rawDispatch);
    this.listChannel.init(this.channelSubscribe);
  }

  componentWillUnmount = () => {
    this.listChannel.unsubscribe();
  }

  onResultSelect = (data) => {
    const listId = this.props.currentList.id;
    if (data.list_id !== listId) {
      const { id, list_id: otherList, ...remainingData } = data;
      this.props.handleItemAdd(listId, remainingData);
    } else {
      const { id } = data;
      const stateParams = { state: 'to_buy' };
      this.props.handleItemEdit(listId, id, stateParams);
    }
  }

  onItemDelete = (id) => {
    const listId = this.props.currentList.id;
    this.props.handleItemDelete(listId, id);
  }

  onItemEdit = (data) => {
    const listId = this.props.currentList.id;
    const { id } = data;
    let modifiedData;
    if (data.list_id !== listId) {
      modifiedData = { ...data, target_list: data.list_id, state: 'to_buy' };
    }
    this.props.handleItemEdit(listId, id, modifiedData || data);
    this.props.navigation.navigate('ItemsIndex');
  }

  onItemStateChange = (item, desiredState) => {
    const listId = this.props.currentList.id;
    const { id } = item;
    const data = { state: desiredState };
    this.props.handleItemEdit(listId, id, data);
  }

  channelSubscribe = () => this.listChannel.subscribe()

  removeBoughtItems = () => {
    const boughtItemsIds = byState(this.props.items, 'bought').map(i => i.id);
    const params = { ids: boughtItemsIds, state: 'deleted' };
    const listId = this.props.currentList.id;
    this.props.handleRemoveBoughtItems(listId, params);
  }

  moveMissingItems = (targetListId) => {
    const missingItemsIds = byState(this.props.items, 'missing').map(i => i.id);
    const params = { ids: missingItemsIds, target_list: targetListId, state: 'to_buy' };
    const listId = this.props.currentList.id;
    this.props.handleMoveMissingItems(listId, params);
    this.props.navigation.navigate('ItemsIndex');
  }

  handleItemAdd = (data) => {
    this.props.clearForm();
    const listId = this.props.currentList.id;
    const existingItem = this.props.items.filter(
      i => i.name.localeCompare(data.name, 'en', { sensitivity: 'base' }) === 0);
    if (existingItem.length > 0) {
      const item = existingItem[0];
      if (item.aasm_state === 'deleted') {
        data.state = 'to_buy';
      }
      this.props.handleItemEdit(listId, item.id, data);
    } else {
      this.props.handleItemAdd(listId, data);
    }
    this.props.navigation.navigate('ItemsIndex');
  }

  props: Props
  listChannel: ListSubscription

  render() {
    const {
      navigation, currentList, items, lists, isRemoveBoughtDisabled, isMoveMissingDisabled,
    } = this.props;
    return (
      <Container>
        {currentList &&
          <BaseHeader navigation={navigation} headerText={currentList.name} hasGoBack>
            <Button
              transparent
              onPress={() => navigation.navigate('Search', {
                  onResultSelect: this.onResultSelect, onItemDelete: this.onItemDelete
              })}
            >
              <Icon name="search" />
            </Button>
            <Button
              transparent
              onPress={() => navigation.navigate('NewItem', { onSubmit: this.handleItemAdd })}
            >
              <Icon name="add" />
            </Button>
          </BaseHeader>
        }
        <LoadableContent>
          { items.length > 0 &&
            <ItemsScreen
              navigation={navigation}
              currentList={currentList}
              items={items}
              lists={lists}
              onItemStateChange={this.onItemStateChange}
              onItemEdit={this.onItemEdit}
              isRemoveBoughtDisabled={isRemoveBoughtDisabled}
              removeBoughtItems={this.removeBoughtItems}
              isMoveMissingDisabled={isMoveMissingDisabled}
              moveMissingItems={this.moveMissingItems}
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
  isRemoveBoughtDisabled: byState(state.itemsReducer.items, 'bought').length === 0,
  isMoveMissingDisabled: byState(state.itemsReducer.items, 'missing').length === 0,
});

const mapDispatchToProps = dispatch => ({
  rawDispatch: dispatch,
  clearForm: () => dispatch(reset('newItem')),
  handleSetCurrentList: id => dispatch(apiCall(`/lists/${id}`, setCurrentListAndFetchItems, GET)),
  handleItemAdd: (listId, data) => dispatch(apiCall(`/lists/${listId}/items`, addItem, POST, data)),
  handleItemDelete: (listId, id) => {
    dispatch(apiCall(`/lists/${listId}/items/${String(id)}`, () => removeItem(id), DELETE));
  },
  handleItemEdit: (listId, id, data) => {
    dispatch(apiCall(`/lists/${listId}/items/${id}`, editItem, PUT, data));
  },
  handleRemoveBoughtItems: (listId, data) => {
    dispatch(apiCall(`/lists/${listId}/items`, massUpdateItems, PUT, data));
  },
  handleMoveMissingItems: (listId, data) => {
    dispatch(apiCall(`/lists/${listId}/items`, massMoveItems, PUT, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
