import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from "native-base";

import styles from "./styles";
import call from "../../../services/api";
import { GET } from "../../../state/constants";
import BaseHeader from "../../../common/BaseHeader";
export interface Props {
	navigation: any;
}
export interface State {}
class BlankPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const { navigation } = this.props;
		return (
			<Container style={styles.container}>
				<BaseHeader navigation={navigation} headerText="Blank Page" />
				<Content padder>
					<Text>{param !== undefined ? param.name.item : "Create Something Awesome . . ."}</Text>
					<Text>You are logged in!!!!</Text>
				</Content>
			</Container>
		);
	}
}

export default BlankPage;
