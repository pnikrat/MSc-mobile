// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, editItem, setCurrentListAndFetchItems } from './state/ItemsActions';
import BaseHeader from '../common/BaseHeader';

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

  render() {
    const { navigation, currentList } = this.props;
    return (
      <Container>
        {currentList && <BaseHeader navigation={navigation} headerText={currentList.name} hasGoBack /> }
        <Content padder>
          {currentList && <Text>{currentList.name}</Text>}
          <Text>This it items container</Text>
        </Content>
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
