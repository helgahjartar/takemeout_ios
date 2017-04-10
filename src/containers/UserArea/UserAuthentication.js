import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button } from 'react-native';
import style from './style';

export default class UserAuthentication extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.authMainTitleContainer}>
          <Text style={style.mainTitleText}>Skráðu þig inn</Text>
        </View>
        <View style={style.titleAuthContainer}>
          <TextInput
          style={style.inputText}
          placeholder="Notendanafn"
          />
        </View>
        <View style={style.titleAuthContainer}>
          <TextInput
          style={style.inputText}
          placeholder="Lykilorð"
          secureTextEntry={true}
          />
        </View>
        <View style={style.buttonAuthBackground}>
          <Button
            color='#FFFFFF'
            title='Innskrá'
            onPress={() => navigate('')}
          />
        </View>
      </View>
    );
  }
}
