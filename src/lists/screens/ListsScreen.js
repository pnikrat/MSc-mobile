// @flow
import React, { Component } from 'react';
import { Button, Container, Content, Icon,
  List, ListItem, Text, Toast, ActionSheet } from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  currentUser: Object,
  lists: Array<Object>,
  onNewListSubmit: (data: Object) => void,
  actionSheetOptions: Object,
  onListDelete: (number) => void,
  onListEdit: (data: Object) => void,
}

class ListsScreen extends Component<Props> {
  compare = (x: Object, y: Object) => {
    if (x.user_id === y.user_id) {
      if (x.id < y.id) {
        return -1;
      }
      return 1;
    }
    return x.user_id === this.props.currentUser.id ? -1 : 1;
  }

  isCreator = (creatorId: number) => this.props.currentUser.id === creatorId

  render() {
    const {
      navigation, lists, onNewListSubmit, actionSheetOptions, onListDelete, onListEdit,
    } = this.props;
    const listsItems = lists.sort(this.compare).map(list =>
      (
        <ListItem
          key={list.id}
          onLongPress={() => {
            ActionSheet.show(actionSheetOptions, (index) => {
              if (index === 1) {
                if (this.isCreator(list.user_id)) {
                  onListDelete(list.id);
                } else {
                  Toast.show({ text: 'Nie możesz usuwać listy innej osoby', buttonText: 'OK' });
                }
              } else if (index === 0) {
                navigation.navigate('EditList', { onSubmit: onListEdit, initialValues: list });
              }
            });
          }}
        >
          <Text>{list.name}</Text>
        </ListItem>
      )
    );
    return (
      <Container>
        <BaseHeader navigation={navigation} headerText="Listy">
          <Button transparent>
            <Icon
              name="add"
              onPress={() => navigation.navigate('NewList', { onSubmit: onNewListSubmit })}
            />
          </Button>
        </BaseHeader>
        <Content>
          <List>
            {listsItems}
          </List>
        </Content>
      </Container>
    )
  }
}

export default ListsScreen;
