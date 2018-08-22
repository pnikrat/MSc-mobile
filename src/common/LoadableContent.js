// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Content, Spinner } from 'native-base';

type Props = {
  isLoading: boolean,
  children: React.Node,
};

function LoadableContent({ isLoading, children }: Props) {
  return (
    <React.Fragment>
      { isLoading ? (
        <Content>
          <Spinner />
        </Content>
      ) : (
        <Content>
          {children}
        </Content>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  isLoading: state.apiLoadingReducer.loading,
});

export default connect(mapStateToProps, null)(LoadableContent);
