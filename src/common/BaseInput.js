// @flow
import * as React from 'react';
import type { FieldProps } from 'redux-form';
import { Label, Item, Input } from 'native-base';

type Props = {
  label?: string,
  placeholder?: string,
  secureTextEntry?: boolean,
  keyboardType?: string,
} & FieldProps

const BaseInput = ({
  input, label, meta, placeholder, secureTextEntry, keyboardType,
}: Props) => (
  <Item error={meta.error && meta.touched} floatingLabel>
    <Label>{label}</Label>
    <Input
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      keyboardType={keyboardType}
      {...input}
    />
  </Item>
);

export default BaseInput;
