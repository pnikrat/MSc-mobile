// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Content, Spinner } from 'native-base';
import { View, StyleSheet } from 'react-native';

type Props = {
  isLoading: boolean,
  children: React.Node,
};

function LoadableContent({ isLoading, children }: Props) {
  return (
    <React.Fragment>
      { isLoading ? (
        <Content contentContainerStyle={{ flex: 1 }}>
          {children}
          <View style={{ ...StyleSheet.absoluteFillObject }} pointerEvents="box-none">
            <Spinner />
          </View>
        </Content>
      ) : (
        <Content contentContainerStyle={{ flex: 1 }}>
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
