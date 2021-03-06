// @flow
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Button, Container, Content, Text, Toast, View } from 'native-base';
import BaseHeader from '../common/BaseHeader';
import styles from '../styles/common';
import ItemsFormCore from './ItemsFormCore';

type Props = {
  navigation: any,
  onSubmit: (data: Object) => void,
} & FormProps

class NewItemForm extends Component<Props> {
  props: Props

  render() {
    const {
      handleSubmit, navigation, errors
    } = this.props;

    return (
      <Container>
        <BaseHeader headerText="Nowa rzecz" navigation={navigation} hasGoBack />
        <Content padder>
          { errors && Toast.show({ text: errors.name, buttonText: 'OK' }) }
          <View padder>
            <ItemsFormCore />
            <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
              <Text>Dodaj</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const validateItemForm = (values: Object) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Pole wymagane';
  }
  return errors;
};

const DecoratedNewItemForm = reduxForm({ form: 'newItem', validateItemForm })(NewItemForm);
export {
  DecoratedNewItemForm, validateItemForm
};
