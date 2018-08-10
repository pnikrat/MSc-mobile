// @flow
import React from 'react';
import { Button, Container, Content, Icon, List, ListItem, Text, ActionSheet } from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  currentUser: Object,
  lists: Array<Object>,
  onNewListSubmit: (data: Object) => void,
  actionSheetOptions: Object,
}

const ListsScreen = ({
  navigation, currentUser, lists, onNewListSubmit, actionSheetOptions,
}: Props) => (
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
        {lists.map(list => (
          <ListItem key={list.id} onLongPress={() => ActionSheet.show(actionSheetOptions, index => console.log(index))}>
            <Text>{list.name}</Text>
          </ListItem>
        ))}
      </List>
    </Content>
  </Container>
);

export default ListsScreen;
