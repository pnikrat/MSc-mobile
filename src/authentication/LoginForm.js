// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Button, Text, View } from 'native-base';
import BaseInput from '../common/BaseInput';
import styles from '../styles/common';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class LoginForm extends Component<Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View padder>
        <Field
          autoFocus
          name="email"
          label="Adres email"
          component={BaseInput}
          keyboardType="email-address"
        />
        <Field
          name="password"
          label="Hasło"
          component={BaseInput}
          secureTextEntry
        />
        <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
          <Text>Zaloguj się</Text>
        </Button>
      </View>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Pole wymagane';
  }
  if (!values.password) {
    errors.password = 'Pole wymagane';
  }
  return errors;
};

export default reduxForm({ form: 'signin', validate })(LoginForm);
