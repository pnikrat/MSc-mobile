// @flow
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';
import Login from './container/LoginContainer';
import Home from './container/HomeContainer';
import BlankPage from './container/BlankPageContainer';
import Sidebar from './container/SidebarContainer';
import LandingContainer from './container/LandingContainer';

const Drawer = createDrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: 'Home',
		contentComponent: props => <Sidebar {...props} />,
	}
);

const RootStack = createStackNavigator(
	{
		Landing: { screen: LandingContainer },
		Login: { screen: Login },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: 'Landing',
		headerMode: 'none',
	}
);

export default () => (
	<Root>
		<RootStack />
	</Root>
);
