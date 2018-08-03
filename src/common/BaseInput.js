// @flow
import * as React from 'react';
import type { FieldProps } from 'redux-form';
import { Label, Item, Input, Text } from 'native-base';

type Props = {
  label?: string,
  placeholder?: string,
  secureTextEntry?: boolean,
  keyboardType?: string,
} & FieldProps

const BaseInput = ({
  input, label, meta, last, placeholder, secureTextEntry, keyboardType,
}: Props) => (
  <Item error={meta.error && meta.touched} last={last} floatingLabel>
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
