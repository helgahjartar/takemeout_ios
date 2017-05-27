import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import style from './style';

export default class ErrorScreen extends Component {

  render() {
    const { errorMsg } = this.props;
    return(
      <View style={style.container} >
        <View style={style.imgContainer} >
          <Image
            source={require('./ErrorImg.jpg')}
            style={style.errorImg}
          />
        </View>
        <Text>Uh Oh! Something Went Wrong</Text>
        <Text>{errorMsg}</Text>
      </View>
    );
  }
}
