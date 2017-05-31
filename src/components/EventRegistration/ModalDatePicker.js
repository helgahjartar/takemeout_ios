import React, { Component } from 'react';
import { Modal, Text, View, DatePickerIOS, Button } from 'react-native';
import style from './style';

export default class ModalDatePicker extends Component {
  static defaultProps = {
    placeholder: 'Veldu úr listanum'
  };

  constructor(props) {
     super(props);
     this.state = { visible: false };
   }

   formatDate(time) {
     minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
     clock = time.getHours() + ':' + minutes;
     date = time.getDate() + '.' + (time.getMonth()+1) + '.' + time.getFullYear();
     return date + ' - ' + clock;
   }

   getTextControlValue(date) {
     if (!date) return this.props.placeholder;
     let formatted = this.formatDate(date);
     return formatted;
   }

  render() {
    const { placeholder, timeZoneOffset, mode, time, onDateChange } = this.props;

    let textControlValue = this.getTextControlValue(time);
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
