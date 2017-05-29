import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from './style'

export default class EventRow extends Component {
  render() {
    const { event, onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress(event.id)}>
        <View style={style.eventRow}>
          <Text style={style.eventNameText}>{event.name}</Text>
          <Text style={style.locationText}>{event.locationName}</Text>
          <Text style={style.typeText}>{event.typeDescriptionIce}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
