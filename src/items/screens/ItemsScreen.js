// @flow
import * as React from 'react';
import { Button, Icon, List, Text, ListItem } from 'native-base';
import { ListView } from 'react-native';
import styles from '../styles/itemsStyles';

type Props = {
  navigation: any,
  currentList: Object,
  items: Object,
  lists: Object,
}

class ItemsScreen extends React.Component<Props> {
  props: Props

  compare = (x: Object, y: Object) => {
    if (x.aasm_state === y.aasm_state) {
      if (x.id < y.id) {
        return -1;
      }
      return 1;
    }
    return x.aasm_state === 'to_buy' ? -1 : 1;
  }

  mapAndReduce = (filterType: Function, items: Object) => items.filter(filterType)
    .map(i => [i.price, i.quantity]).reduce(this.sumMoney, 0.0);
  sumMoney = (prev: number, next: Array<any>) => prev + (Number(next[0]) * (next[1] || 1))
  active = (x: Object) => x.aasm_state === 'to_buy' || x.aasm_state === 'bought'
  bought = (x: Object) => x.aasm_state === 'bought'
  missing = (x: Object) => x.aasm_state === 'missing'
  otherLists = (x: Object) => x.id !== this.props.currentList.id

  // singleItem = (item: Object) => (
  //   <SingleItem
  //     key={item.id}
  //     item={item}
  //     onItemStateChange={this.props.onItemStateChange}
  //   />
  // );

  // listOption = (list: Object) => (
  //   <Dropdown.Item
  //     key={list.id}
  //     onClick={() => this.props.moveMissingItems(list.id)}
  //   >
  //     {list.name}
  //   </Dropdown.Item>
  // )

  render() {
    const {
      navigation, currentList, items
    } = this.props;
    const activeItemsDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const activeComponents = activeItemsDs.cloneWithRows(items.filter(this.active).sort(this.compare));
    // const missingComponents = items.filter(this.missing)
    //   .map(item => this.singleItem(item));
    // const availableLists = lists.filter(this.otherLists).map(list => this.listOption(list));

    const activeTotal = this.mapAndReduce(this.active, items);
    const boughtTotal = this.mapAndReduce(this.bought, items);

    return (
      <React.Fragment>
        <List
          leftOpenValue={75}
          rightOpenValue={-75}
          dataSource={activeComponents}
          renderRow={item => (
            <ListItem style={styles.listItem}>
              <Text>{item.name}</Text>
            </ListItem>
          )}
          renderLeftHiddenRow={item => (
            <Button full>
              <Icon active name="information-circle" />
            </Button>
          )}
          renderRightHiddenRow={item => (
            <Button full danger>
              <Icon active name="trash" />
            </Button>
          )}
        />
      </React.Fragment>
    );
  }
}
export default ItemsScreen;