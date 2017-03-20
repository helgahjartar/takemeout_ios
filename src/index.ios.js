/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

class takemeout_ios extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>
          Takemeout
        </Text>
        <Button title="Klikkað" onPress={() => navigate('Bar', { name: 'Nafn' }) } />
      </View>
    );
  }
}

class takemeout_ios2 extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>
          { name2 }
        </Text>
      </View>
    );
  }
}


const App = StackNavigator({
  Home: { screen: takemeout_ios },
  Bar: { screen: takemeout_ios2 }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('takemeout_ios', () => App);
