// @flow
import * as React from 'react';
import { SwipeRow, Button, Icon, ActionSheet, } from 'native-base';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/itemsStyles';

type Props = {
  navigation: any,
  item: Object,
  onItemStateChange: (Object, string) => void,
  actionSheetOptions: Object,
  onItemEdit: (Object) => void,
}

class SingleItem extends React.Component<Props> {
  props: Props


  render() {
    const {
      item, onItemStateChange, actionSheetOptions, navigation, onItemEdit,
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
          <TouchableOpacity
            style={styles.itemContainer}
            onLongPress={() => {
              ActionSheet.show(actionSheetOptions, (index) => {
                if (index === 1) {
                  onItemStateChange(item, 'deleted');
                } else if (index === 0) {
                  navigation.navigate('EditItem', { onSubmit: onItemEdit, initialValues: item });
                }
              });
            }}
          >
            <React.Fragment>
              <View style={styles.centerVertically}>
                <Text>{item.name}</Text>
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
            </React.Fragment>
          </TouchableOpacity>
        }
      />
    );
  }
}
export default SingleItem;
