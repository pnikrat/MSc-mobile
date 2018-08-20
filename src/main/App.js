// @flow
import React from 'react';
import { createStackNavigator, createSwitchNavigator,
  createBottomTabNavigator } from 'react-navigation';
import { Root } from 'native-base';
import LoginContainer from '../authentication/LoginContainer';
import RegisterContainer from '../authentication/RegisterContainer';
import ListsContainer from '../lists/ListsContainer';
import AuthLoadingContainer from '../authentication/AuthLoadingContainer';
import LandingContainer from '../landing/LandingContainer';
import AccountContainer from '../authentication/AccountContainer';
import TabBarNavigation from './TabBarNavigation';
import { DecoratedNewListForm } from '../lists/NewListForm';
import EditListForm from '../lists/EditListForm';
import ItemsContainer from '../items/ItemsContainer';
import GroupsContainer from '../groups/GroupsContainer';
import { DecoratedNewGroupForm } from '../groups/NewGroupForm';
import EditGroupForm from '../groups/EditGroupForm';
import GroupDetailsScreen from '../groups/screens/GroupDetailsScreen';

function mapNavigationStateParamsToProps(ScreenComponent) {
  type Props = {
    navigation: any,
  }
  return class extends React.Component<Props> {
    static navigationOptions = ScreenComponent.navigationOptions
    render() {
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };
}

const GroupsStack = createStackNavigator(
  {
    GroupsIndex: GroupsContainer,
    NewGroup: mapNavigationStateParamsToProps(DecoratedNewGroupForm),
    EditGroup: mapNavigationStateParamsToProps(EditGroupForm),
    GroupDetails: mapNavigationStateParamsToProps(GroupDetailsScreen),
  },
  {
    headerMode: 'none',
  }
);

const ListsStack = createStackNavigator(
  {
    ListsIndex: ListsContainer,
    NewList: mapNavigationStateParamsToProps(DecoratedNewListForm),
    EditList: mapNavigationStateParamsToProps(EditListForm),
    ItemsIndex: ItemsContainer,
  },
  {
    headerMode: 'none',
  }
);

const AppStack = createBottomTabNavigator(
  {
    Lists: ListsStack,
    Groups: GroupsStack,
    Account: AccountContainer,
  },
  {
    tabBarComponent: props =>
      <TabBarNavigation {...props} />
  },
);

const AuthStack = createStackNavigator(
  {
    Landing: { screen: LandingContainer },
    Login: { screen: LoginContainer },
    Register: { screen: RegisterContainer },
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);

const RootStack = createSwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingContainer },
    App: { screen: AppStack },
    Auth: { screen: AuthStack },
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  }
);

export default () => (
  <Root>
    <RootStack />
  </Root>
);
