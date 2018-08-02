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
    <Content>
      <View padder>
        <Button block styles={styles.button.mb} onPress={() => navigation.navigate('Register')}>
          <Text>Rejestracja</Text>
        </Button>
        <Button block onPress={() => navigation.navigate('Login')}>
          <Text>Logowanie</Text>
        </Button>
      </View>
    </Content>
    <Footer style={styles.footer.background}>
      <View style={styles.footer.contentAlignment}>
        <View padder>
          <Text style={styles.footer.text}>Made by Przemo</Text>
        </View>
      </View>
    </Footer>
  </Container>
);

export default LandingScreen;
