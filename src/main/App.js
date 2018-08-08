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
import BlankPage from '../stories/screens/BlankPage';
import TabBarNavigation from './TabBarNavigation';

const AppStack = createBottomTabNavigator(
	{
		Lists: ListsContainer,
		Groups: BlankPage,
		Account: BlankPage,
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
