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
} & FormProps

class NewListForm extends Component<Props> {
  props: Props

  render() {
    const {
      handleSubmit, navigation, errors
    } = this.props;
    return (
      <Container>
        <BaseHeader headerText="Nowa lista" navigation={navigation} hasGoBack />
        <Content padder>
          { errors && Toast.show({ text: errors.name, buttonText: 'OK' }) }
          <View padder>
            <Field
              autoFocus
              name="name"
              label="Nazwa listy zakupów"
              component={BaseInput}
            />
            <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
              <Text>Stwórz</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const validateListForm = (values: Object) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Pole wymagane';
  }
  return errors;
};

const DecoratedNewListForm = reduxForm({ form: 'newList', validateListForm })(NewListForm);
export {
  DecoratedNewListForm, validateListForm
};
