import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import EventOverview from './src/containers/EventOverview/EventOverview';
import HomeScreen from './src/containers/HomeScreen/HomeScreen';
import UserRegistration from './src/containers/UserArea/UserRegistration';
import UserAuthentication from './src/containers/UserArea/UserAuthentication';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  EventOverview: { screen: EventOverview },
  UserRegistration: { screen: UserRegistration },
  UserAuthentication: { screen: UserAuthentication }
});

AppRegistry.registerComponent('takemeout_ios', () => App);
