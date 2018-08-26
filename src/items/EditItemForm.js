// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Container, Content, Text, Toast, View, Picker } from 'native-base';
import BaseHeader from '../common/BaseHeader';
import styles from '../styles/common';
import { validateItemForm } from './NewItemForm';
import ItemsFormCore from './ItemsFormCore';
import BasePicker from '../common/BasePicker';

type Props = {
  navigation: any,
  onSubmit: (data: Object) => void,
  lists: Object,
  initialValues: Object,
} & FormProps

class EditItemForm extends Component<Props> {
  props: Props

  listSelectOption = (list: Object) => (
    <Picker.Item value={list.id} key={list.id} label={list.name} />
  )

  render() {
    const {
      handleSubmit, navigation, errors, lists, initialValues
    } = this.props;
    const availableLists = lists.map(list => this.listSelectOption(list));
    return (
      <Container>
        <BaseHeader headerText="Edytuj rzecz" navigation={navigation} hasGoBack />
        <Content padder>
          { errors && Toast.show({ text: errors.name, buttonText: 'OK' }) }
          <View padder>
            <ItemsFormCore />
            { initialValues.aasm_state === 'missing' &&
              <Field
                name="list_id"
                label="Przynależna lista"
                iosHeader="Przynależna lista"
                component={BasePicker}
              >
                {availableLists}
              </Field>
            }
            <Button block onPress={handleSubmit} style={styles.actionButtonMargin}>
              <Text>Edytuj</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.listsReducer.lists,
});

const DecoratedEditItemForm = reduxForm({ form: 'editItem', validateItemForm })(EditItemForm);

export default connect(mapStateToProps, null)(DecoratedEditItemForm);
