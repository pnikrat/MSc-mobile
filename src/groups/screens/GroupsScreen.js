// @flow
import React, { Component } from 'react';
import { Button, Container, Content, Icon,
  List, ListItem, Text, Left, Body, ActionSheet, Toast } from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  groups: Array<Object>,
  currentUser: Object,
  actionSheetOptions: Object,
  onNewGroupSubmit: (data: Object) => void,
  onGroupDelete: (number) => void,
  onGroupEdit: (data: Object) => void,
}

class GroupsScreen extends Component<Props> {
  isCreator = (creatorId: number) => this.props.currentUser.id === creatorId
  compare = (x: Object) => {
    return x.creator_id === this.props.currentUser.id ? -1 : 1;
  };

  render() {
    const {
      navigation, groups, onNewGroupSubmit, actionSheetOptions, onGroupDelete, onGroupEdit,
    } = this.props;

    const groupItems = groups.sort(this.compare).map(group => (
      <ListItem
        key={group.id}
        icon
        onLongPress={() => { this.isCreator(group.creator_id) &&
            ActionSheet.show(actionSheetOptions, (index) => {
              if (index === 1) {
                onGroupDelete(group.id);
              } else if (index === 0) {
                navigation.navigate('EditGroup', { onSubmit: onGroupEdit, initialValues: group });
              }
            });
          }}
      >
        <Left>
          { this.isCreator(group.creator_id) &&
            <Icon name="star" />
          }
          { !this.isCreator(group.creator_id) &&
            <Icon name="person" />
          }
        </Left>
        <Body>
          <Text>{group.name}</Text>
        </Body>
      </ListItem>
    ));

    return (
      <Container>
        <BaseHeader navigation={navigation} headerText="Grupy">
          <Button transparent>
            <Icon
              name="add"
              onPress={() => navigation.navigate('NewGroup', { onSubmit: onNewGroupSubmit })}
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
