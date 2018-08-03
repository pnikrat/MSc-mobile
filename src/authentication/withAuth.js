// @flow
import * as React from 'react';
import { Container, Header, Content, Text, Toast } from 'native-base';

type P = {}

function withAuth(WrappedForm: React.ComponentType<P>) {
  type Props = {
    headerText: string,
    errorCode: number,
    navigation: any,
    sendAuthRequest: (Object) => Promise<void>
  }

  return class extends React.Component<Props> {
    redirect = () => {
      this.props.navigation.navigate('BlankPage');
    }

    handleAuth = (data: Object) => {
      const { sendAuthRequest } = this.props;
      return sendAuthRequest(data)
        .then(() => this.redirect()).catch(e => this.handleInvalidAuth(e));
    };

    handleInvalidAuth = (error: Object) => {
      const { errorCode } = this.props;
      const { response: { status, data: { errors } }, response } = error;
      if (response && status === errorCode) {
        if (errors.full_messages) {
          Toast.show({text: errors.full_messages[0], buttonText: 'OK'});
        } else {
          Toast.show({text: 'Autoryzacja nie powiodła się.', buttonText: 'OK'});
        }
      } else {
        Toast.show({text: 'Błąd serwera, proszę spróbować później.', buttonText: 'OK'});
      }
    }

    render() {
      const {
        headerText
      } = this.props;
      return (
        <Container>
          <Header>
            <Text>{headerText}</Text>
          </Header>
          <Content padder>
            <WrappedForm onSubmit={this.handleAuth} />
          </Content>
        </Container>
      );
    }
  };
}

export default withAuth;
