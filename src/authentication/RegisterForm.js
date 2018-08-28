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

class RegisterForm extends Component<Props> {
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
        <Field
          name="passwordConfirmation"
          label="Potwierdź hasło"
          component={BaseInput}
          secureTextEntry
        />
        <Field
          name="firstName"
          label="Imię"
          component={BaseInput}
        />
        <Field
          name="lastName"
          label="Nazwisko"
          component={BaseInput}
        />
        <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
          <Text>Zarejestruj się</Text>
        </Button>
      </View>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Pole wymagane';
  }
  if (!values.email) {
    errors.email = 'Pole wymagane';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Hasła nie są takie same';
  }
  if (!values.password) {
    errors.password = 'Pole wymagane';
  } else if (values.password.length < 6) {
    errors.password = 'Co najmniej 6 znaków';
  }
  return errors;
};

export default reduxForm({ form: 'signup', validate })(RegisterForm);
