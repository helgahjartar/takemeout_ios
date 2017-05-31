import React, { Component } from 'react';
import { Modal, Text, View, PickerIOS, Button } from 'react-native';
import style from './style';

let PickerItemIOS = PickerIOS.Item;

export default class ModalPicker extends Component {
  static defaultProps = {
    placeholder: 'Veldu úr listanum'
  };

  constructor(props) {
     super(props);
     this.state = { visible: false};
   }

  isNullOrEmpty(objWithLength) {
    if (!objWithLength) return true;
    if (objWithLength.length == 0) return true;
    return false;
  }

  getTextControlValue(items, selectedValue) {
    if (this.isNullOrEmpty(items) || !selectedValue) return this.props.placeholder;
    let item = items.find(item => item.value === selectedValue);
    return item.label;
  }

  render() {
    const { items, selectedValue, onValueChange } = this.props;

    let textControlValue = this.getTextControlValue(items, selectedValue);
    return(
      <View>
        <Modal transparent={false} visible={this.state.visible}>
          <PickerIOS
            selectedValue={selectedValue}
            onValueChange={(value) => onValueChange(value)}>
            {items.map(i => {
              return (
                <PickerItemIOS
                  key={i.key}
                  value={i.value}
                  label={i.label}
                />
              )
            })}
          </PickerIOS>
          <View>
            <Button
              color='#000000'
              title='Velja'
              onPress={ () => this.setState({ visible: false }) }
            />
          </View>
        </Modal>
        <Text onPress={() => this.setState({ visible:true }) } style={style.inputText}>
          {textControlValue}
        </Text>
      </View>
    )
  }
}
