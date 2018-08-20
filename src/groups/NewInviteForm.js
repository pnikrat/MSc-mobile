// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Button, Container, Content, Text, Toast, View } from 'native-base';
import BaseHeader from '../common/BaseHeader';
import BaseInput from '../common/BaseInput';
import styles from '../styles/common';

type Props = {
  navigation: any,
  onSubmit: (data: Object) => void,
  initialValues: Object,
} & FormProps

class NewInviteForm extends Component<Props> {
  props: Props

  render() {
    const {
      handleSubmit, navigation, errors
    } = this.props;
    return (
      <Container>
        <BaseHeader headerText="Nowe zaproszenie" navigation={navigation} hasGoBack />
        <Content padder>
          { errors && Toast.show({ text: errors.email, buttonText: 'OK' }) }
          <View padder>
            <Field
              name="email"
              label="Email zapraszanego"
              component={BaseInput}
              keyboardType="email-address"
            />
            <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
              <Text>Zaproś</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const validate = (values: Object) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Pole wymagane';
  }
  return errors;
};

export default reduxForm({ form: 'newInvite', validate })(NewInviteForm);
