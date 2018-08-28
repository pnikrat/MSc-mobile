// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Content, Container, Icon, List, ListItem, Text } from 'native-base';
import BaseHeader from '../../common/BaseHeader';
import { apiCall } from '../../services/apiActions';
import { POST } from '../../state/constants';
import { redirectBack } from '../state/GroupsActions';

type Props = {
  navigation: any,
  group: Object,
  currentUser: Object,
  handleSetCurrentGroup: (number) => void,
  handleInviteCreate: (data: Object, navigation: any) => void,
}

class GroupDetailsScreen extends Component<Props> {
  componentDidMount = () => {
    const groupId = this.props.navigation.getParam('groupId');
    this.props.handleSetCurrentGroup(groupId);
  }

  handleInviteCreate = (data: Object) => {
    this.props.handleInviteCreate(data, this.props.navigation);
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
    const { group, navigation, currentUser } = this.props;
    const users = group.users ? group.users : [];
    const members = users.sort(this.compare).map(user => this.singleMember(user));
    return (
      <Container>
        <BaseHeader navigation={navigation} headerText={`${group.name}`} hasGoBack>
          { group.creator_id === currentUser.id &&
          <Button
            transparent
            onPress={() =>
                navigation.navigate('NewInvite',
                  {
                    onSubmit: this.handleInviteCreate,
                    initialValues: { invitable_id: group.id, invitable_type: 'Group' }
                  }
                )
            }
          >
            <Icon name="person-add" />
          </Button> }
        </BaseHeader>
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
  currentUser: state.reduxTokenAuth.currentUser.attributes,
});

const mapDispatchToProps = dispatch => ({
  handleInviteCreate: (data, navigation) => {
    dispatch(apiCall('/invites', redirectBack(navigation), POST, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailsScreen);
