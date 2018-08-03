// @flow
import * as React from 'react';
import { Container, Header, Content, Text } from 'native-base';
import { SubmissionError } from 'redux-form';

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
      this.props.navigation.navigate('Blank Page');
    }

    handleAuth = (data: Object) => {
      const { sendAuthRequest } = this.props;
      debugger;
      return sendAuthRequest(data)
        .then(() => this.redirect()).catch(e => this.handleInvalidAuth(e));
    };

    handleInvalidAuth = (error: Object) => {
      debugger;
      // const { errorCode } = this.props;
      // const { response: { status, data: { errors } }, response } = error;
      // if (response && status === errorCode) {
      //   if (errors.full_messages) {
      //     throw new SubmissionError(errors);
      //   } else {
      //     throw new SubmissionError({
      //       _error: 'Logowanie nieudane!'
      //     });
      //   }
      // } else {
      //   throw new SubmissionError({
      //     _error: 'Błąd serwera, proszę spróbować później.'
      //   });
      // }
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
