// @flow
import * as React from 'react';
import { Container, Content, Toast } from 'native-base';
import BaseHeader from '../common/BaseHeader';

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
      this.props.navigation.navigate('Home');
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
        headerText, navigation,
      } = this.props;
      return (
        <Container>
          <BaseHeader headerText={headerText} navigation={navigation} />
          <Content padder>
            <WrappedForm onSubmit={this.handleAuth} />
          </Content>
        </Container>
      );
    }
  };
}

export default withAuth;
