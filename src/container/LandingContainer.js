// @flow
import React from 'react';
import { Container, Header, Body, Icon, Title, Content, View, Button, Text, Footer } from 'native-base';

type Props = {
  navigation: any,
}

const LandingContainer = ({navigation}: Props) => (
  <Container>
    <Header style={{ height: 200 }}>
      <Body style={{ alignItems: 'center' }}>
        <Icon name="flash" style={{ fontSize: 104 }} />
        <Title>Grupowa lista zakupów</Title>
      </Body>
    </Header>
    <Content>
      <View padder>
        <Button block onPress={() => navigation.navigate('Register')}>
          <Text>Rejestracja</Text>
        </Button>
        <Button block onPress={() => navigation.navigate('Login')}>
          <Text>Logowanie</Text>
        </Button>
      </View>
    </Content>
    <Footer style={{ backgroundColor: '#F8F8F8' }}>
      <View style={{ alignItems: 'center', opacity: 0.5, flexDirection: 'row' }}>
        <View padder>
          <Text style={{ color: '#000' }}>Made by Przemo</Text>
        </View>
      </View>
    </Footer>
  </Container>
);

export default LandingContainer;
