import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button, ScrollView, DatePickerIOS, PickerIOS } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import { connect } from 'react-redux';
import { fetchLocations, fetchPerformers } from '../../actions/eventQueryActions';
import { createEvent, saveEventForm } from '../../actions/eventRegistrationActions';
import { validateInput, validateTitle, validateDescription, returnFormErrors, validateDateInput } from '../Helpers/validators';

var PickerItemIOS = PickerIOS.Item;

class EventRegistration extends Component {

  static defaultProps = {
    time: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  constructor(props) {
     super(props);
     this.state = {newForm: true, name: '', description: '', type: 'Tónleikar', performer :'Gísli Pálmi', location: 'Prikið', time: this.props.time, timeZoneOffsetInHours: this.props.timeZoneOffsetInHours};
     this.handleSubmit = this.handleSubmit.bind(this);
     const { fetchLocations } = this.props;
     const { fetchPerformers } = this.props;
     fetchLocations();
     fetchPerformers();
   }

   onDateChange = (time) => {
     this.setState({time: time});
   };

   handleSubmit(event) {
     event.preventDefault();
     const errors = returnFormErrors(this.state);
     var timeToIso = this.state.time.toISOString();
     // Todo: Change this
     if (errors.value != null) {
       event.preventDefault();
       console.log(errors);
       alert("Form er vitlaust fyllt út");
       return;
     }
     const { createEvent } = this.props;
     createEvent(this.state);
     this.state.newForm = false;
  }

  componentDidMount() {
    if (this.props.eventName) this.setState({ name : this.props.eventName});
    if (this.props.eventDesc) this.setState({ description: this.props.eventDesc});
  }

 componentDidUpdate() {
   const { saveEventForm } = this.props;
   saveEventForm(this.state);
  }


  render() {
    const { name, location, performer, description, time, type, newForm} = this.state;
    const { success, hasBeenSent, isAuthenticated, eventName, eventDesc } = this.props;
    return (
      <View style={style.container}>
        <View style={style.mainTitleContainer}>
          <Text style={style.mainTitleText}>Skráðu upplýsingar um viðburð</Text>
        </View>
        <ScrollView>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Skráðu titil viðburðar:</Text>
          <TextInput
          style={style.inputText}
          value={name}
          onChangeText={(name) => this.setState({ name })}
          />
          <Text style={style.helperText}>{validateTitle(name)}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu staðsetningu eða skráðu nýja:</Text>
          <PickerIOS
            selectedValue={location}
            onValueChange={(location) => this.setState({location: location})}>
            <PickerItemIOS
                value="Prikið"
                label="Prikið"
            />
            <PickerItemIOS
                value="Húrra"
                label="Húrra"
            />
            <PickerItemIOS
                value="Gaukur á stöng"
                label="Gaukur á stöng"
            />
            <PickerItemIOS
                value="Loft Hostel"
                label="Loft Hostel"
            />
          </PickerIOS>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu flytjanda eða skráðu nýjan:</Text>
          <PickerIOS
            selectedValue={performer}
            onValueChange={(performer) => this.setState({performer: performer})}>
            <PickerItemIOS
                value="Gísli Pálmi"
                label="Gísli pálmi"
            />
            <PickerItemIOS
                value="Prins Póló"
                label="Prins Pólo"
            />
            <PickerItemIOS
                value="101 Boys"
                label="101 Boys"
            />
            <PickerItemIOS
                value="Reykjavíkurdætur"
                label="Reykjavíkurdætur"
            />
          </PickerIOS>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu dagsetning og tíma viðburðar:</Text>
            <DatePickerIOS
              date={time}
              mode="datetime"
              timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
              onDateChange={this.onDateChange}
              //style={style.timeComponent}
            />
            <Text style={style.helperText}>{validateDateInput(time.toISOString())}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu týpu af viðburði:</Text>
          <PickerIOS
            selectedValue={type}
            onValueChange={(type) => this.setState({type: type})}>
            <PickerItemIOS
                value="Tónleikar"
                label="Tónleikar"
            />
            <PickerItemIOS
                value="Uppistand"
                label="Uppistand"
            />
            <PickerItemIOS
                value="Sýning"
                label="Sýning"
            />
         </PickerIOS>
        </View>
        <View style={style.inputContainer}>
        <Text style={style.titleText}>Skráðu lýsingu sem birtist með viðburði:</Text>
          <TextInput
          style={style.descText}
          value={description}
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(description) => this.setState({ description })}
          />
          <Text style={style.helperText}>{validateDescription(description)}</Text>
          {!success && hasBeenSent && <Text style={style.helperText}>Ekki tókst að skrá viðburð - vinsamlegast reyndu aftur</Text>}
        </View>
        <View style={style.buttonBackground}>
          <Button
            color='#FFFFFF'
            title='Skrá viðburð'
            onPress={this.handleSubmit}
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { success, hasBeenSent } = state.event.registration;
  const { isAuthenticated } = state.userAuth;
  const { eventName, eventLoc, eventPerf, eventDesc } = state.formSave;
  console.log(state);
  return {
    eventName : eventName,
    eventLoc: eventLoc,
    eventPerf: eventPerf,
    eventDesc: eventDesc,
    isAuthenticated : isAuthenticated,
    success : success,
    hasBeenSent : hasBeenSent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: (data) => dispatch(createEvent(data)),
    saveEventForm: (data) => dispatch(saveEventForm(data)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchPerformers: () => dispatch(fetchPerformers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRegistration)
