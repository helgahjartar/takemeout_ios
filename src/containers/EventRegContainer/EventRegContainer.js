import React, { Component } from 'react'
import { Text, ListView, View, TextInput, Button, ScrollView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import EventRegistration from '../../components/EventRegistration/EventRegistration'
import PerformerRegistration from '../../components/EventRegistration/PerformerRegistration'
import LocationRegistration from '../../components/EventRegistration/LocationRegistration'
import style from './style'

export default class EventRegContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { eventForm: true, locationForm: false, performerForm: false};
  }

  render() {
    const { navigate } = this.props.navigation;
    const { eventForm, locationForm, performerForm } = this.state;
    return (
      <View style={style.container}>
        <View style={style.buttonContainer}>
            <View style={style.buttonBackground}>
              <Button
                color='#FFFFFF'
                title='Viðburður'
                onPress={ () => { this.setState({eventForm: true, locationForm: false, performerForm: false})}}
              />
            </View>
            <View style={style.buttonBackground}>
              <Button
                color='#FFFFFF'
                title='Staðsetning'
                onPress={ () => { this.setState({eventForm: false, locationForm: true, performerForm: false})}}
              />
            </View>
            <View style={style.buttonBackground}>
              <Button
                color='#FFFFFF'
                title='Flytjandi'
                onPress={ () => { this.setState({eventForm: false, locationForm: false, performerForm: true})}}
              />
            </View>
        </View>
        <View style={style.component}>
            {eventForm && <EventRegistration/>}
            {locationForm && <LocationRegistration/>}
            {performerForm && <PerformerRegistration/>}
        </View>
      </View>
    );
  }
}
