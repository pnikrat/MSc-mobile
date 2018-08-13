// @flow
import * as React from 'react';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

type Props = {
  navigation: any,
  headerText: string,
  hasGoBack?: boolean,
  children?: React.Node,
}

const BaseHeader = ({
  navigation, headerText, hasGoBack, children
}: Props) => (
  <Header>
    <Left>
      { hasGoBack &&
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Button>
      }
    </Left>

    <Body style={{ flex: 3 }}>
      <Title>{headerText}</Title>
    </Body>

    <Right>
      {children}
    </Right>
  </Header>
);

export default BaseHeader;
