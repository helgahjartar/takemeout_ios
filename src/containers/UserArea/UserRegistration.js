import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';

export default class UserRegistration extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={style.container}>
        <View style={style.mainTitleContainer}>
          <Text style={style.mainTitleText}>Skráðu notendaupplýsingar</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Notendanafn:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn notendanafn"
          />
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Tölvupóstur:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn tölvupóst"
          />
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Lykilorð:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn lykilorð"
          />
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Lykilorð aftur:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn lykilorð aftur"
          />
        </View>
        <View style={style.buttonBackground}>
          <Button
            color='#FFFFFF'
            title='Skrá notanda'
            onPress={() => navigate('UserAuthentication')}
          />
        </View>
      </View>
    );
  }
}
