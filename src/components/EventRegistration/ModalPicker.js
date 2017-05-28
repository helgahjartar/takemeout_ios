import React, { Component } from 'react';
import { Modal, Text, View, PickerIOS, Button } from 'react-native';
import style from './style';

let PickerItemIOS = PickerIOS.Item;

export default class ModalPicker extends Component {
  constructor(props) {
     super(props);
     this.state = { defaultPlaceholder: 'Veldu úr listanum', visible: false};
   }

  componentDidMount() {
    if (this.props.placeholder) this.setState({ placeholder : this.props.placeholder});
  }

  getLabel(items, selectedValue) {
    let item = items.find(item => item.value === selectedValue);
    return item.label;
  }

  render() {
    const { items, placeholder, selectedValue, onValueChange } = this.props;
    const { defaultPlaceholder } = this.state;
    let placeText = placeholder ? placeholder : defaultPlaceholder;
    let textControlValue = selectedValue ? this.getLabel(items, selectedValue) : placeText;
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
