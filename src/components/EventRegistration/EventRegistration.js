import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import ModalPicker from './ModalPicker';
import ModalDatePicker from './ModalDatePicker';
import { connect } from 'react-redux';
import { fetchLocations, fetchPerformers, fetchTypes } from '../../actions/eventQueryActions';
import { createEvent, saveEventForm } from '../../actions/eventRegistrationActions';
import { validateInput, validateTitle, validateDescription, returnFormErrors, validateDateInput } from '../Helpers/validators';

class EventRegistration extends Component {
  static defaultProps = {
    time: new Date(),
    timeOffset: (-1) * (new Date()).getTimezoneOffset(),
  };

  constructor(props) {
    super(props);
    this.state = {
      newForm: true,
      name: null,
      description: null,
      selectedPerformer : null,
      selectedLocation: null,
      selectedType: null,
      time: this.props.time,
      timeZoneOffset: this.props.timeOffset
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    const { fetchPickerData } = this.props;
    fetchPickerData();
  }

   handleSubmit(event) {
     const errors = returnFormErrors(this.state);

     if (errors.value != null) {
       event.preventDefault();
       console.log(errors);
       alert("Form er vitlaust fyllt út");
       return;
     }
     const { createEvent } = this.props;

     createEvent({
       name: this.state.name,
       descriptionEng: this.state.description,
       descriptionIce: this.state.description,
       time: this.state.time.toISOString(),
       typeId: this.state.selectedType,
       locationId: this.state.selectedLocation,
       performerIds: [ this.state.selectedPerformer ]
     });
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
    const { name, selectedLocation, selectedPerformer, selectedType, description, time, newForm} = this.state;
    const { locations, performers, types, success, hasBeenSent, isAuthenticated, eventName, eventDesc } = this.props;
    console.log(this.props);

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
          <ModalPicker
            placeholder={'Veldu Staðsetningu'}
            items={locations.data}
            selectedValue={selectedLocation}
            onValueChange={(value) => this.setState({ selectedLocation: value })}
            />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu flytjanda eða skráðu nýjan:</Text>
          <ModalPicker
            placeholder={'Veldu Flytjanda'}
            items={performers.data}
            selectedValue={selectedPerformer}
            onValueChange={(value) => this.setState({ selectedPerformer: value })}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu dagsetning og tíma viðburðar:</Text>
            <ModalDatePicker
              time={this.state.time}
              timeOffset={this.state.timeZoneOffset}
              mode='datetime'
              onDateChange={(value) => this.setState({ time: value })}
            />
            <Text style={style.helperText}>{validateDateInput(time.toISOString())}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu Tegund Viðburðar:</Text>
          <ModalPicker
            placeholder={'Veldu Tegund Viðburðar'}
            items={types.data}
            selectedValue={selectedType}
            onValueChange={(value) => this.setState({ selectedType: value })}
          />
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
  const { locations, performers, types } = state.event.query;
  const { isAuthenticated } = state.userAuth;
  const { eventName, eventLoc, eventPerf, eventDesc } = state.formSave;
  return {
    eventName : eventName,
    eventLoc: eventLoc,
    eventPerf: eventPerf,
    eventDesc: eventDesc,
    isAuthenticated : isAuthenticated,
    success : success,
    hasBeenSent : hasBeenSent,
    locations: locations,
    performers: performers,
    types: types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: (data) => dispatch(createEvent(data)),
    saveEventForm: (data) => dispatch(saveEventForm(data)),
    fetchPickerData: () => {
      dispatch(fetchLocations());
      dispatch(fetchPerformers());
      dispatch(fetchTypes());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRegistration)
