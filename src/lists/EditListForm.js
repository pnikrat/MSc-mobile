// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Button, Container, Content, Text, Toast, View } from 'native-base';
import BaseHeader from '../common/BaseHeader';
import BaseInput from '../common/BaseInput';
import styles from '../styles/common';
import { validateListForm } from './NewListForm';

type Props = {
  navigation: any,
  onSubmit: (data: Object) => void,
  initialValues: Object,
} & FormProps

class EditListForm extends Component<Props> {
  props: Props

  render() {
    const {
      handleSubmit, navigation, errors
    } = this.props;
    return (
      <Container>
        <BaseHeader headerText="Edytuj listę zakupów" navigation={navigation} hasGoBack />
        <Content padder>
          { errors && Toast.show({ text: errors.name, buttonText: 'OK' }) }
          <View padder>
            <Field
              name="name"
              label="Nazwa listy zakupów"
              component={BaseInput}
            />
            <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
              <Text>Edytuj</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'editList',
  validateListForm,
})(EditListForm);
