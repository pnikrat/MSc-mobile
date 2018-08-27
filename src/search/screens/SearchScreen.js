// @flow
import * as React from 'react';
import { Container, Text, ListItem, View } from 'native-base';
import { SectionList } from 'react-native';
import LoadableContent from '../../common/LoadableContent';
import SearchHeader from '../../common/SearchHeader';
import styles from '../../items/styles/itemsStyles';

type Props = {
  navigation: any,
  currentList: Object,
  searchResults: Array<Object>,
  searchFieldValue: string,
  onChangeText: (string) => void,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
}

class SearchScreen extends React.Component<Props> {
  props: Props

  currentListFilter = (x: Object) => x.list_id === this.props.currentList.id;
  otherListFilter = (x: Object) => x.list_id !== this.props.currentList.id;

  render() {
    const {
      navigation, searchResults, searchFieldValue, onChangeText, onResultSelect, onItemDelete,
    } = this.props;
    const currentListResults = {
      title: 'Z aktualnej listy', data: searchResults.filter(this.currentListFilter)
    };
    const otherListResults = {
      title: 'Z innych list', data: searchResults.filter(this.otherListFilter)
    };

    return (
      <Container>
        <SearchHeader
          navigation={navigation}
          searchPlaceholder="Wyszukaj produkty"
          hasGoBack
          searchFieldValue={searchFieldValue}
          onChangeText={onChangeText}
        />
        <LoadableContent>
          <SectionList
            sections={[
              currentListResults,
              otherListResults,
            ]}
            renderSectionHeader={({ section: { title } }) => (
              <ListItem itemDivider>
                <Text style={styles.itemSection}>{title}</Text>
              </ListItem>
            )}
            renderItem={({ item }) => (
              <ListItem onPress={() => onResultSelect(item)}>
                <View style={styles.itemContainer}>
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
                </View>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </LoadableContent>
      </Container>
    );
  }
}
export default SearchScreen;
