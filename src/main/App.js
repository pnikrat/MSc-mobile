// @flow
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';
import Home from './Home';
import LoginContainer from '../authentication/LoginContainer';

import BlankPage from '../container/BlankPageContainer';
import Sidebar from '../container/SidebarContainer';

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
		Home: { screen: Home },
		Login: { screen: LoginContainer },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
	}
);

export default () => (
	<Root>
		<RootStack />
	</Root>
);
