// @flow
import React, { Component } from 'react';
import { Button, Container, Content, Icon,
  List, ListItem, Text } from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  groups: Array<Object>,
}

class GroupsScreen extends Component<Props> {
  render() {
    const {
      navigation, groups
    } = this.props;

    const groupItems = groups.map(group => (
      <ListItem key={group.id}>
        <Text>{group.name}</Text>
      </ListItem>
    ));

    return (
      <Container>
        <BaseHeader navigation={navigation} headerText="Grupy">
          <Button transparent>
            <Icon
              name="add"
            />
          </Button>
        </BaseHeader>
        <Content>
          <List>
            {groupItems}
          </List>
        </Content>
      </Container>
    )
  }
}

export default GroupsScreen;
