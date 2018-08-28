// @flow
import React from 'react';
import {
  Button, Icon, Text, Footer, FooterTab
} from 'native-base';

type Props = {
  navigation: any,
}

function TabBarNavigation({ navigation }: Props) {
  const isActive = routeIndex => navigation.state.index === routeIndex;
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={isActive(0)}
          onPress={() => navigation.navigate('Lists')}
        >
          <Icon active={isActive(0)} name="list" />
          <Text>Listy</Text>
        </Button>
        <Button
          vertical
          active={isActive(1)}
          onPress={() => navigation.navigate('Groups')}
        >
          <Icon active={isActive(1)} name="people" />
          <Text>Grupy</Text>
        </Button>
        <Button
          vertical
          active={isActive(2)}
          onPress={() => navigation.navigate('Account')}
        >
          <Icon active={isActive(2)} name="settings" />
          <Text>Konto</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

export default TabBarNavigation;
