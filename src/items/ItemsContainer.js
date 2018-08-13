// @flow
import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import BaseHeader from '../common/BaseHeader';

type Props = {
  navigation: any,
}

type State = {
  listId: number,
}

class ItemsContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listId: 0,
    };
  }

  componentDidMount = () => {
    const listId = this.props.navigation.getParam('listId');
    // change to Redux on separate branch
    this.setState({
      listId,
    });
  }

  render() {
    const { navigation } = this.props;
    const { listId } = this.state;
    return (
      <Container>
        <BaseHeader navigation={navigation} headerText="Nazwa sklepu" hasGoBack />
        <Content padder>
          <Text>{listId}</Text>
          <Text>This it items container</Text>
        </Content>
      </Container>
    );
  }
}

export default ItemsContainer;
