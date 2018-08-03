// @flow
import React from 'react';
import LandingScreen from './screens/LandingScreen';
import styles from './styles/landingStyles';

type Props = {
  navigation: any,
}

const LandingContainer = ({navigation}: Props) => (
  <LandingScreen navigation={navigation} styles={styles} />
);

export default LandingContainer;
