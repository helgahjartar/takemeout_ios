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
    timeZoneOffset: (-1) * (new Date()).getTimezoneOffset(),
  };

  initialFormData() {
    return {
      name: '',
      descriptionEng: '',
      descriptionIce: '',
      time: this.getDateTime(),
      locationId: null,
      performerId: null,
      typeId: null
    }
  }

  constructor(props) {
    super(props);
    const { dispatchFetchPickerData } = props;
    this.handleSubmit = this.handleSubmit.bind(this);
    dispatchFetchPickerData();
    const { savedFormData } = props.registration;
    const data = savedFormData ? savedFormData : this.initialFormData();
    this.state = {
      formData: data,
      formWasSent: false
    }
  }

  componentWillUnmount() {
    const { dispatchSaveEventForm } = this.props;
    dispatchSaveEventForm(this.state.formData);
  }

  getDateTime() {
    let datetime = new Date();
    datetime.setMinutes(0)
    datetime.setSeconds(0, 0);
    return datetime;
  }

  setFormDataState(newState) {
    const { formData } = this.state;
    this.setState({ formData: Object.assign({}, formData, newState) });
  }

  handleSubmit(event) {
    const errors = returnFormErrors(this.state.formData);
    if (errors.value != null) {
      event.preventDefault();
      alert("Form er vitlaust fyllt út");
      return;
    }
    let { performerId, ...formData } = this.state.formData;
    let data =  Object.assign({}, formData, { performerIds: [ performerId ] });

    const { dispatchCreateEvent } = this.props;
    dispatchCreateEvent(data);
    this.setState({ formData: this.initialFormData() })
  }

  render() {
    const { formData } = this.state;
    const { timeZoneOffset } = this.props;
    const { isPending, errorMsg, savedFormData } = this.props.registration;
    const { locations, performers, types } = this.props.query;

    const event = errorMsg && savedFormData ? savedFormData : formData;

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
            value={event.name}
            onChangeText={ (value) => this.setFormDataState({ name: value }) }
          />
          <Text style={style.helperText}>{validateTitle(event.name)}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu staðsetningu eða skráðu nýja:</Text>
          <ModalPicker
            placeholder={'Veldu Staðsetningu'}
            items={locations.data}
            selectedValue={event.locationId}
            onValueChange={ (value) => this.setFormDataState({ locationId: value }) }
            />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu flytjanda eða skráðu nýjan:</Text>
          <ModalPicker
            placeholder={'Veldu Flytjanda'}
            items={performers.data}
            selectedValue={event.performerId}
            onValueChange={ (value) => this.setFormDataState({ performerId: value }) }
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu dagsetning og tíma viðburðar:</Text>
            <ModalDatePicker
              time={event.time}
              timeOffset={this.state.timeZoneOffset}
              mode='datetime'
              onDateChange={ (value) => this.setFormDataState({ time: value }) }
            />
            <Text style={style.helperText}>{validateDateInput(event.time.toISOString())}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Veldu Tegund Viðburðar:</Text>
          <ModalPicker
            placeholder={'Veldu Tegund Viðburðar'}
            items={types.data}
            selectedValue={event.typeId}
            onValueChange={ (value) => this.setFormDataState({ typeId: value }) }
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Skráðu lýsingu sem birtist með viðburði:</Text>
          <TextInput
            style={style.descText}
            value={event.descriptionIce}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(value) => this.setFormDataState({ descriptionIce: value, descriptionEng: value }) }
          />
          <Text style={style.helperText}>{validateDescription(event.descriptionEng)}</Text>
          {errorMsg && <Text style={style.helperText}>Ekki tókst að skrá viðburð - vinsamlegast reyndu aftur</Text>}
        </View>
        <View style={style.buttonBackground}>
          <Button
            color='#FFFFFF'
            title='Skrá viðburð'
            disable={isPending}
            onPress={this.handleSubmit}
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { isPending, errorMsg, eventForm } = state.event.registration;
  const { locations, performers, types } = state.event.query;

  return {
    registration: {
      isPending : isPending,
      errorMsg : errorMsg,
      savedFormData: eventForm
    },
    query: {
      locations: locations,
      performers: performers,
      types: types
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateEvent: (data) => dispatch(createEvent(data)),
    dispatchSaveEventForm: (data) => dispatch(saveEventForm(data)),
    dispatchFetchPickerData: () => {
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
