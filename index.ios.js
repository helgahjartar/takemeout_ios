import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import EventOverview from './src/containers/EventOverview/EventOverview';
import HomeScreen from './src/containers/HomeScreen/HomeScreen';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  EventOverview: { screen: EventOverview }
});

AppRegistry.registerComponent('takemeout_ios', () => App);
