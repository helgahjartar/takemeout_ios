import React, { Component } from 'react';
import { Text, View } from 'react-native';
import style from './style'

export default class EventRow extends Component {
  render() {
    const { event } = this.props;
    return (
      <View style={style.eventRow}>
        <Text style={style.eventNameText}>{event.name}</Text>
        <Text style={style.locationText}>{event.locationName}</Text>
        <Text style={style.typeText}>{event.typeDescriptionIce}</Text>
      </View>
    );
  }
}
