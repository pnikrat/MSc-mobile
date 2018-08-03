import * as Expo from 'expo';
import * as React from 'react';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';

import store from '../state/store';
import App from '../main/App';
import getTheme from '../theme/components';
import variables from '../theme/variables/platform';
import { verifyCredentials } from '../authConfig';

export interface Props {}
export interface State {
	isLoading: boolean,
	isReady: boolean,
}

verifyCredentials(store);

export default class Setup extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			isReady: false,
		};
	}
	componentDidMount() {
		this.loadFonts();
	}
	async loadFonts() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
		});

		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady || this.state.isLoading) {
			return <Expo.AppLoading />;
		}
		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={store}>
					<App />
				</Provider>
			</StyleProvider>
		);
	}
}
