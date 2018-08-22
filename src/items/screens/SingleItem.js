// @flow
import React, { Component } from 'react';
import { SwipeRow, Button, Icon } from 'native-base';
import { View, Text } from 'react-native';
import styles from '../styles/itemsStyles';

type Props = {
  item: Object,
}

class SingleItem extends Component<Props> {
  props: Props


  render() {
    const {
      item
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        rightOpenValue={-75}
        right={
          <Button danger onPress={() => alert('Trash')}>
            <Icon active name="trash" />
          </Button>
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
                  {`${Number(item.price)}`}
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
