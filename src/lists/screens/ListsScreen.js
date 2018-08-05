// @flow
import React from 'react';
import BaseHeader from '../../common/BaseHeader';
import { Container, Content, Text } from 'native-base';

type Props = {
  navigation: any,
  currentUser: Object,
  lists: Array<Object>,
}

const ListsScreen = ({navigation, currentUser, lists}: Props) => (
  <Container>
    <BaseHeader navigation={navigation} headerText="Listy" />
    <Content>
      <Text>Twoje listy</Text>
      <Text>{lists[0].name}</Text>
    </Content>
    {/* <Lists
      lists={lists}
      currentUser={currentUser}
    /> */}
  </Container>
);

export default ListsScreen;
