// @flow
import React from 'react';
import {
  Button, Icon, Text, Footer, FooterTab
} from 'native-base';

type Props = {
  navigation: any,
}

function TabBarNavigation({ navigation }: Props) {
  const isActive = routeName => navigation.state.routeName === routeName;
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={isActive('Lists')}
          onPress={() => navigation.navigate('Lists')}
        >
          <Icon active={isActive('Lists')} name="list" />
          <Text>Listy</Text>
        </Button>
        <Button
          vertical
          active={isActive('Groups')}
          onPress={() => navigation.navigate('Groups')}
        >
          <Icon active={isActive('Groups')} name="people" />
          <Text>Grupy</Text>
        </Button>
        <Button
          vertical
          active={isActive('Account')}
          onPress={() => navigation.navigate('Account')}
        >
          <Icon active={isActive('Account')} name="settings" />
          <Text>Konto</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

export default TabBarNavigation;
