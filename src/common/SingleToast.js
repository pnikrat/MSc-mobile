// @flow
import * as React from 'react';
import { Toast } from 'native-base';

type Props = {
  duration: number,
  message: string,
  type: string,
  onClose: (void) => void,
}

class SingleToast extends React.Component<Props> {
  componentWillMount = () => {
    Toast.show({
      text: this.props.message,
      buttonText: 'OK',
      duration: this.props.duration,
      type: this.props.type,
      onClose: () => this.props.onClose(),
    });
  }

  props: Props;

  render() {
    return null;
  }
}

export default SingleToast;
