// @flow
import * as React from 'react';
import { Container, Text, ListItem } from 'native-base';
import { SectionList } from 'react-native';
import BaseHeader from '../../common/BaseHeader';
import LoadableContent from '../../common/LoadableContent';

type Props = {
  navigation: any,
  currentList: Object,
  // items: Object,
  // lists: Object,
  // onItemStateChange: (Object, string) => void,
  // onItemEdit: (Object) => void,
  // isRemoveBoughtDisabled: boolean,
  // removeBoughtItems: () => void,
  // isMoveMissingDisabled: boolean,
  // moveMissingItems: (number) => void,
}

class SearchScreen extends React.Component<Props> {
  props: Props

  render() {
    const {
      navigation,
      // lists, items, onItemStateChange, navigation,
      // onItemEdit, isRemoveBoughtDisabled, removeBoughtItems,
      // isMoveMissingDisabled, moveMissingItems,
    } = this.props;
    // const currentListResults = { title: 'Z aktualnej listy', data: results.filter(this.toBuy) };
    // const otherListResults = { title: 'Z innych list', data: results.filter(this.bought) };

    return (
      <Container>
        <BaseHeader navigation={navigation} headerText="Wyszukaj produkty" hasGoBack>
          {/* // search input here */}
        </BaseHeader>
        <LoadableContent>
          {/* <SectionList
            sections={[
              currentListResults,
              otherListResults,
            ]}
            renderSectionHeader={({ section: { title } }) => (
              <ListItem itemDivider style={styles.boughtSection}>
                <Text style={styles.itemSection}>{title}</Text>
              </ListItem>
            )}
            renderItem={({ item }) => (
              <SearchResult
                navigation={navigation}
                item={item}
                onItemStateChange={onItemStateChange}
                actionSheetOptions={this.actionSheetOptions}
                onItemEdit={onItemEdit}
              />
            )}
            keyExtractor={item => item.id}
          /> */}
        </LoadableContent>
      </Container>
    );
  }
}
export default SearchScreen;
