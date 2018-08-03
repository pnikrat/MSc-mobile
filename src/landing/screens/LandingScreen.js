// @flow
import React from 'react';
import {
  Container, Header, Body, Icon, Title, Content, View, Button, Text, Footer
} from 'native-base';

type Props = {
  navigation: any,
  styles: any,
}

const LandingScreen = ({navigation, styles}: Props) => (
  <Container>
    <Header style={styles.header}>
      <Body style={styles.headerBody}>
        <Icon name="cart" style={styles.icon} />
        <Title>Grupowa lista zakupów</Title>
      </Body>
    </Header>
    <Content padder>
      <Button block style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text>Rejestracja</Text>
      </Button>
      <Button block style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text>Logowanie</Text>
      </Button>
    </Content>
    <Footer style={styles.footerBackground}>
      <View style={styles.footerContentAlignment}>
        <View padder>
          <Text style={styles.footerText}>Made by Przemo</Text>
        </View>
      </View>
    </Footer>
  </Container>
);

export default LandingScreen;
