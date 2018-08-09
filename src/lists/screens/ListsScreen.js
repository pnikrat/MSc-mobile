// @flow
import React from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  currentUser: Object,
  lists: Array<Object>,
}

const ListsScreen = ({ navigation, currentUser, lists }: Props) => (
  <Container>
    <BaseHeader navigation={navigation} headerText="Listy" />
    <Content>
      <List>
        {lists.map(list => (
          <ListItem key={list.id}>
            <Text>{list.name}</Text>
          </ListItem>
        ))}
      </List>
    </Content>
  </Container>
);

export default ListsScreen;
