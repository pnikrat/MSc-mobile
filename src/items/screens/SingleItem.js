// @flow
import * as React from 'react';
import { SwipeRow, Button, Icon } from 'native-base';
import { View, Text } from 'react-native';
import styles from '../styles/itemsStyles';

type Props = {
  item: Object,
  onItemStateChange: (Object, string) => void,
}

class SingleItem extends React.Component<Props> {
  props: Props


  render() {
    const {
      item, onItemStateChange,
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        rightOpenValue={item.aasm_state === 'to_buy' ? -150 : -75}
        right={
          <View style={styles.stateButtonsContainer}>
            { item.aasm_state === 'to_buy' &&
              <React.Fragment>
                <Button
                  success
                  onPress={() => onItemStateChange(item, 'bought')}
                  style={styles.stateButtons}
                >
                  <Icon active name="checkmark" />
                </Button>
                <Button
                  warning
                  onPress={() => onItemStateChange(item, 'missing')}
                  style={styles.stateButtons}
                >
                  <Icon active name="close" />
                </Button>
              </React.Fragment>
            }
            { (item.aasm_state === 'bought' || item.aasm_state === 'missing') &&
              <Button
                light
                onPress={() => onItemStateChange(item, 'to_buy')}
                style={styles.stateButtons}
              >
                <Icon active name="undo" />
              </Button>
            }
          </View>
        }
        body={
          <View style={styles.itemContainer}>
            <View style={styles.centerVertically}>
              <Text style={styles.marginBottom}>{item.name}</Text>
              <Text>
                {item.quantity && `Ilość: ${Number(item.quantity)} ${item.unit || ''}`}
              </Text>
            </View>
            <View style={styles.centerVertically}>
              { item.price &&
                <Text>
                  {`${Number(item.price)} zł`}
                </Text>
              }
            </View>
          </View>
        }
      />
    );
  }
}
export default SingleItem;
