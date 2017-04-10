//export default './Container';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View, Button } from 'react-native';
import style from './style';

export default class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Take Me Out</Text>
        </View>
        <View style={style.buttonContainer}>
          <View style={style.buttonInnerContainer}>
            <View style={style.buttonBackground}>
              <Button
                color='#FFFFFF'
                onPress={() => navigate('EventOverview', {})}
                title='Skoða Viðburði'
              />
            </View>
          </View>
          <View style={style.buttonInnerContainer}>
            <View style={style.buttonBackground}>
              <Button
                color='#FFFFFF'
                title='Mitt Svæði'
                onPress={() => navigate('UserRegistration')}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
