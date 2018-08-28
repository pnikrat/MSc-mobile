// @flow
import * as React from 'react';
import { Header, Left, Button, Icon, Item, Input } from 'native-base';

type Props = {
  navigation: any,
  searchPlaceholder: string,
  hasGoBack?: boolean,
  searchFieldValue: string,
  onChangeText: (string) => void,
}

const SearchHeader = ({
  navigation, searchPlaceholder, hasGoBack, searchFieldValue, onChangeText,
}: Props) => (
  <Header searchBar rounded>
    <Left>
      { hasGoBack &&
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Button>
      }
    </Left>
    <Item>
      <Icon name="ios-search" />
      <Input
        autoFocus
        placeholder={searchPlaceholder}
        value={searchFieldValue}
        onChangeText={onChangeText}
      />
    </Item>
  </Header>
);

export default SearchHeader;
