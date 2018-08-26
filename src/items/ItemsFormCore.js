// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import BaseInput from '../common/BaseInput';

const numeric = text => text && text.replace(/[^0-9|.]/g, '');

const ItemsFormCore = () => (
  <React.Fragment>
    <Field
      name="name"
      label="Nazwa"
      component={BaseInput}
    />
    <Field
      name="quantity"
      label="Ilość"
      component={BaseInput}
      keyboardType="numeric"
      normalize={numeric}
    />
    <Field
      name="unit"
      label="Jednostka"
      component={BaseInput}
    />
    <Field
      name="price"
      label="Cena za jednostkę"
      component={BaseInput}
      keyboardType="numeric"
      normalize={numeric}
    />
  </React.Fragment>
);

export default ItemsFormCore;
