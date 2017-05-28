import React, { Component } from 'react';
import { Modal, Text, View, DatePickerIOS, Button } from 'react-native';
import style from './style';

export default class ModalDatePicker extends Component {
  constructor(props) {
     super(props);
     this.state = { defaultPlaceholder: 'Veldu dagsetningu og tíma', visible: false };
   }

  componentDidMount() {
    if (this.props.placeholder) this.setState({ placeholder : this.props.placeholder});
  }

  render() {
    const { placeholder, timeZoneOffset, mode, time, onDateChange } = this.props;
    const { defaultPlaceholder } = this.state;
    let placeText = placeholder ? placeholder : defaultPlaceholder;
    let textControlValue = time ? time.toISOString() : placeText;
    return(
      <View>
        <Modal transparent={false} visible={this.state.visible}>
          <DatePickerIOS
            date={time}
            mode={mode}
            timeZoneOffsetInMinutes={timeZoneOffset}
            onDateChange={(value) => onDateChange(value)}
          />
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
