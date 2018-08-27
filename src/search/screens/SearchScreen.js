// @flow
import * as React from 'react';
import { Container, Text, ListItem } from 'native-base';
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
}

class SearchScreen extends React.Component<Props> {
  props: Props

  currentListFilter = (x: Object) => x.list_id === this.props.currentList.id;
  otherListFilter = (x: Object) => x.list_id !== this.props.currentList.id;

  render() {
    const {
      navigation, searchResults, searchFieldValue, onChangeText,
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
              <ListItem>
                <Text>{item.name}</Text>
              </ListItem>
              // <SearchResult
              //   navigation={navigation}
              //   item={item}
              //   onItemStateChange={onItemStateChange}
              //   actionSheetOptions={this.actionSheetOptions}
              //   onItemEdit={onItemEdit}
              // />
            )}
            keyExtractor={item => item.id}
          />
        </LoadableContent>
      </Container>
    );
  }
}
export default SearchScreen;
