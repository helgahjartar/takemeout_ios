import React, { Component } from 'react';
import { Alert, Text, ListView, View, TextInput, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import { connect } from 'react-redux'
import { createLocation, saveLocationForm, resetSuccess } from '../../actions/eventRegistrationActions';
import { validateAddress, validateInput, validateDescription, returnLocationFormErrors } from '../Helpers/validators'

var radio_props = [
   {label: 'Gott aðgengi', value: 0 },
   {label: 'Sæmilegt aðgengi', value: 1 },
   {label: 'Lélegt aðgengi', value: 2 }
 ];

class LocationRegistration extends Component {

  initialFormData() {
    return {
      name: '',
      address: '',
      access: ''
    }
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    const { savedFormData } = props;
    const data = savedFormData ? savedFormData : this.initialFormData();
    this.state = {
      formData: data,
      formWasSent: false
    }
  }

  componentWillUnmount() {
    const { dispatchSaveLocationForm } = this.props;
    dispatchSaveLocationForm(this.state.formData);
  }

  handleSubmit(event) {
   const errors = returnLocationFormErrors(this.state.formData);
   if (errors.value != null) {
     event.preventDefault();
     console.log(errors);
     alert("Form er vitlaust fyllt út");
     return;
   }
   const { dispatchCreateLocation } = this.props;
   dispatchCreateLocation(this.state.formData);
   this.setState({ formData: this.initialFormData() })
  }

  setFormDataState(newState) {
    const { formData } = this.state;
    this.setState({ formData: Object.assign({}, formData, newState) });
  }

  render() {
    const { formData } = this.state;
    const { isPending, errorMsg, success, savedFormData, dispatchResetSuccess } = this.props;

    const location = errorMsg && savedFormData ? savedFormData : formData;
    if (success)
      Alert.alert( 'Skráning Tóks', 'Staðsetning var skráð', [ { text: 'OK', onPress: () => dispatchResetSuccess() } ] );

    return (
      <View style={style.container}>
        <View style={style.mainTitleContainerLoc}>
          <Text style={style.mainTitleText}>Skráðu upplýsingar um staðsetningu viðburðar</Text>
        </View>
        <View style={style.inputContainerLoc}>
          <Text style={style.titleText}>Staðarheiti:</Text>
          <TextInput
            style={style.inputText}
            value={location.name}
            onChangeText={ (value) => this.setFormDataState({ name: value }) }
          />
          <Text style={style.helperText}>{validateInput(location.name)}</Text>
        </View>
        <View style={style.inputContainerLoc}>
          <Text style={style.titleText}>Heimilisfang:</Text>
          <TextInput
            style={style.inputText}
            value={location.address}
            onChangeText={ (value) => this.setFormDataState({ address: value }) }
          />
          <Text style={style.helperText}>{validateAddress(location.address)}</Text>
        </View>
        <View style={style.inputContainerLoc}>
          <Text style={style.titleText}>Aðgengi:</Text>
          <TextInput
            style={style.inputText}
            value={location.access}
            onChangeText={ (value) => this.setFormDataState({ access: value }) }
          />
          <Text style={style.helperText}>{validateInput(location.access)}</Text>
        </View>
        <View style={style.buttonBackgroundLoc}>
          <Button
            color='#FFFFFF'
            title='Skrá staðsetningu'
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { isPending, errorMsg, success, locationForm } = state.event.registration;

  return {
    success : success,
    isPending : isPending,
    errorMsg: errorMsg,
    savedFormData : locationForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateLocation: (data) => dispatch(createLocation(data)),
    dispatchSaveLocationForm: (data) => dispatch(saveLocationForm(data)),
    dispatchResetSuccess: () => dispatch(resetSuccess()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationRegistration)
