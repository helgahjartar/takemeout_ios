import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import EventOverview from './src/containers/EventOverview/EventOverview';
import HomeScreen from './src/containers/HomeScreen/HomeScreen';
import UserRegistration from './src/components/UserArea/UserRegistration';
import UserAuthentication from './src/components/UserArea/UserAuthentication';
import App from "./src";

// const App = StackNavigator({
//   Home: { screen: HomeScreen },
//   EventOverview: { screen: EventOverview },
//   UserRegistration: { screen: UserRegistration },
//   UserAuthentication: { screen: UserAuthentication }
// });

AppRegistry.registerComponent('takemeout_ios', () => App);
