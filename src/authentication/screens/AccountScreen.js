// @flow
import React from 'react';
import {
  Container, Content, Button, Text
} from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  logoutCallback: () => void,
}

const AccountScreen = ({ logoutCallback, navigation }: Props) => (
  <Container>
    <BaseHeader headerText="Konto" navigation={navigation} />
    <Content padder>
      <Button block onPress={logoutCallback}>
        <Text>Wylogowanie</Text>
      </Button>
    </Content>
  </Container>
);

export default AccountScreen;
