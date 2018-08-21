// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { apiRemoveSuccess, apiRemoveError } from '../services/apiActions';
import SingleToast from './SingleToast';

type Props = {
  apiSuccess: Array<string>,
  apiError: Array<string>,
  removeApiSuccess: (void) => void,
  removeApiError: (void) => void,
}

class ApiMessageContainer extends React.Component<Props> {
  render() {
    const {
      apiSuccess, apiError, removeApiSuccess, removeApiError,
    } = this.props;
    return (
      <React.Fragment>
        { apiSuccess &&
          apiSuccess.map((message, i) => (
            <SingleToast
              key={i} // eslint-disable-line react/no-array-index-key
              message={message}
              duration={3000}
              type="success"
              onClose={removeApiSuccess}
            />
          ))
        }
        { apiError &&
          apiError.map((message, i) => (
            <SingleToast
              key={i} // eslint-disable-line react/no-array-index-key
              message={message}
              duration={3000}
              type="danger"
              onClose={removeApiError}
            />
          ))
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiSuccess: state.apiMessagesReducer.apiSuccess,
  apiError: state.apiMessagesReducer.apiError,
});

const mapDispatchToProps = dispatch => ({
  removeApiSuccess: () => dispatch(apiRemoveSuccess()),
  removeApiError: () => dispatch(apiRemoveError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiMessageContainer);
