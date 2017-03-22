import React, { Component } from 'react';
import { Text, View } from 'react-native';
import style from './style';

export default class DateRow extends Component {
  render() {
    const { date } = this.props;
    return (
      <View style={style.dateRow}>
        <Text style={style.dateText}>{date}</Text>
      </View>
    );
  }
}
