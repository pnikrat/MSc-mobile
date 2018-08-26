// @flow
import { StyleSheet } from 'react-native';

const styles: any = StyleSheet.create({
  itemSection: {
    fontWeight: 'bold',
  },
  itemContainer: {
    height: 35,
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerVertically: {
    justifyContent: 'center',
  },
  stateButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  stateButtons: {
    height: null,
  },
  priceContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  priceText: {
    marginRight: 15,
  },
  boughtSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
export default styles;
