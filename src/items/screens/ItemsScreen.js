// @flow
import * as React from 'react';
import { Button, Text, ListItem, View } from 'native-base';
import { Platform, SectionList } from 'react-native';
import SingleItem from './SingleItem';
import styles from '../styles/itemsStyles';

type Props = {
  navigation: any,
  currentList: Object,
  items: Object,
  lists: Object,
  onItemStateChange: (Object, string) => void,
  onItemEdit: (Object) => void,
  isRemoveBoughtDisabled: boolean,
  removeBoughtItems: () => void,
  isMoveMissingDisabled: boolean,
  moveMissingItems: (number) => void,
}

class ItemsScreen extends React.Component<Props> {
  getPriceValue = (price: number): string => {
    if (Platform.OS === 'ios') {
      return price.toLocaleString('pl', { style: 'currency', currency: 'PLN' });
    } else {
      return `${price.toFixed(2).toString()} zł`;
    }
  }

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

  actionSheetOptions = {
    options: ['Edytuj', 'Usuń', 'Anuluj'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 2,
    title: 'Wybierz akcję',
  }

  mapAndReduce = (filterType: Function, items: Object) => items.filter(filterType)
    .map(i => [i.price, i.quantity]).reduce(this.sumMoney, 0.0);
  sumMoney = (prev: number, next: Array<any>) => prev + (Number(next[0]) * (next[1] || 1))

  active = (x: Object) => x.aasm_state === 'to_buy' || x.aasm_state === 'bought'
  toBuy = (x: Object) => x.aasm_state === 'to_buy'
  bought = (x: Object) => x.aasm_state === 'bought'
  missing = (x: Object) => x.aasm_state === 'missing'

  otherLists = (x: Object) => x.id !== this.props.currentList.id

  render() {
    const {
      lists, items, onItemStateChange, navigation,
      onItemEdit, isRemoveBoughtDisabled, removeBoughtItems,
      isMoveMissingDisabled, moveMissingItems,
    } = this.props;
    const toBuyItems = { title: 'Do kupienia', data: items.filter(this.toBuy) };
    const boughtItems = { title: 'Kupione', data: items.filter(this.bought) };
    const missingItems = { title: 'Brak w sklepie', data: items.filter(this.missing) };
    const availableLists = lists.filter(this.otherLists);

    const activeTotal = this.mapAndReduce(this.active, items);
    const boughtTotal = this.mapAndReduce(this.bought, items);

    return (
      <React.Fragment>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{`Lista: ${this.getPriceValue(activeTotal)}`}</Text>
          <Text>{`Koszyk: ${this.getPriceValue(boughtTotal)}`}</Text>
        </View>
        <SectionList
          sections={[
            toBuyItems,
            boughtItems,
            missingItems,
          ]}
          renderSectionHeader={({ section: { title } }) => (
            <ListItem itemDivider style={styles.boughtSection}>
              <Text style={styles.itemSection}>{title}</Text>
              { title === 'Kupione' &&
                <Button
                  small
                  primary
                  transparent
                  disabled={isRemoveBoughtDisabled}
                  onPress={() => removeBoughtItems()}
                >
                  <Text>Usuń kupione</Text>
                </Button>
              }
              { title === 'Brak w sklepie' &&
                <Button
                  small
                  primary
                  transparent
                  disabled={isMoveMissingDisabled || availableLists.length === 0}
                  onPress={() => navigation.navigate('MoveItems', { availableLists, moveMissingItems })}
                >
                  <Text>Przenieś brakujące</Text>
                </Button>
              }
            </ListItem>
          )}
          renderItem={({ item }) => (
            <SingleItem
              navigation={navigation}
              item={item}
              onItemStateChange={onItemStateChange}
              actionSheetOptions={this.actionSheetOptions}
              onItemEdit={onItemEdit}
            />
          )}
          keyExtractor={item => item.id}
        />
      </React.Fragment>
    );
  }
}
export default ItemsScreen;
