// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Container, List, ListItem, Text } from 'native-base';
import BaseHeader from '../../common/BaseHeader';

type Props = {
  navigation: any,
  group: Object,
  handleSetCurrentGroup: (number) => void,
}

class GroupDetailsScreen extends Component<Props> {
  componentDidMount = () => {
    const groupId = this.props.navigation.getParam('groupId');
    this.props.handleSetCurrentGroup(groupId);
  }

  props: Props

  compare = (x: Object) => {
    return x.id === this.props.group.creator_id ? -1 : 1;
  }
  singleMember = (member: Object) => (
    <ListItem key={member.id}>
      <Text>
        {`${member.first_name} ${member.last_name || ''}`}
      </Text>
    </ListItem>
  );

  render() {
    const { group, navigation } = this.props;
    const users = group.users ? group.users : [];
    const members = users.sort(this.compare).map(user => this.singleMember(user));
    return (
      <Container>
        <BaseHeader navigation={navigation} headerText={`${group.name}`} hasGoBack />
        <Content>
          <List>
            {members}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  group: state.groupsReducer.currentGroup,
});

export default connect(mapStateToProps, null)(GroupDetailsScreen);
