import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import style from './style'

export default class LoadingSymbolOverlay extends Component {
  render() {
    const { event } = this.props;
    return (
      <View style={style.overlay}>
        <ActivityIndicator style={style.symbol} size="large" />
      </View>
    );
  }
}
