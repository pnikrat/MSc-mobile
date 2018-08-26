// @flow
import React, { Component } from 'react';
import { Button, Container, Content, Text, Icon, View, Picker } from 'native-base';
import BaseHeader from '../../common/BaseHeader';
import styles from '../../styles/common';

type Props = {
  navigation: any,
  availableLists: Object,
  moveMissingItems: (number) => void,
}

type State = {
  targetListId: number,
}

class MoveItemsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      targetListId: props.availableLists[0].id,
    };
  }

  state: State
  props: Props

  listSelectOption = (list: Object) => (
    <Picker.Item value={list.id} key={list.id} label={list.name} />
  )

  render() {
    const {
      navigation, moveMissingItems, availableLists,
    } = this.props;
    const pickerOptions = availableLists.map(list => this.listSelectOption(list))
    return (
      <Container>
        <BaseHeader headerText="Przenieś brakujące" navigation={navigation} hasGoBack />
        <Content padder>
          <View padder>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              placeholder="Wybierz docelową listę"
              selectedValue={this.state.targetListId}
              onValueChange={(value, index) => this.setState({ targetListId: value })}
            >
              {pickerOptions}
            </Picker>
            <Button
              block
              onPress={() => moveMissingItems(this.state.targetListId)}
              style={styles.actionButtonMargin}
            >
              <Text>Przenieś</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}


export default MoveItemsScreen;
