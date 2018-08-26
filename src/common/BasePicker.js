// @flow
import * as React from 'react';
import type { FieldProps } from 'redux-form';
import { Icon, Picker } from 'native-base';

type Props = {
  children?: React.Node,
} & FieldProps

const BasePicker = ({
  input, label, meta, children
}: Props) => (
  <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down-outline" />}
    style={{ width: undefined }}
    selectedValue={input.value}
    onValueChange={(value, index) => input.onChange(value)}
    {...input}
  >
    {children}
  </Picker>
);

export default BasePicker;
