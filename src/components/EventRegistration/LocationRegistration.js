import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import { connect } from 'react-redux'
import { createLocation, saveLocationForm } from '../../actions/index'
import { validateAddress, validateInput, returnLocationFormErrors } from '../Helpers/validators'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
   {label: 'Gott aðgengi', value: 0 },
   {label: 'Sæmilegt aðgengi', value: 1 },
   {label: 'Lélegt aðgengi', value: 2 }
 ];

class LocationRegistration extends Component {

  constructor(props) {
     super(props);
     this.state = {newForm: true, location: '', address: '', access: 0};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const errors = returnLocationFormErrors(this.state);
     if (errors.value != null) {
       event.preventDefault();
       console.log(errors);
       alert("Form er vitlaust fyllt út");
       return;
     }
     const { createLocation } = this.props;
     createLocation(this.state);
     this.state.newForm = false;
  }

  componentDidMount() {
    if (this.props.locationName) this.setState({ location : this.props.locationName});
    if (this.props.locationAddress) this.setState({ address : this.props.locationAddress});
  }

  componentDidUpdate() {
   const { saveLocationForm } = this.props;
   saveLocationForm(this.state);
  }

  render() {
    const { location, access, address, newForm} = this.state;
    const { success, hasBeenSent, isAuthenticated, locationName, locationAddress } = this.props;
    return (
      <View style={style.container}>
        <View style={style.mainTitleContainerLoc}>
          <Text style={style.mainTitleText}>Skráðu upplýsingar um staðsetningu viðburðar</Text>
        </View>
        <View style={style.inputContainerLoc}>
          <Text style={style.titleText}>Staðarheiti:</Text>
          <TextInput
          style={style.inputText}
          value={location}
          onChangeText={(location) => this.setState({ location })}
          />
          <Text style={style.helperText}>{validateInput(location)}</Text>
        </View>
        <View style={style.inputContainerLoc}>
          <Text style={style.titleText}>Heimilisfang:</Text>
          <TextInput
          style={style.inputText}
          value={address}
          onChangeText={(address) => this.setState({ address })}
          />
          <Text style={style.helperText}>{validateAddress(address)}</Text>
        </View>
        <View style={style.inputContainerLoc}>
          <Text style={style.titleText}>Veldu gæði aðgengis á viðburðarstað:</Text>
          <RadioForm
           radio_props={radio_props}
           initial={0}
           buttonSize={5}
           value={access}
           onPress={(access) => {this.setState({access:access})}}
         />
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
  const { success, hasBeenSent } = state.registration
  const { isAuthenticated } = state.userAuth
  const { locationName, locationAddress } = state.formSave

  console.log(state)

  return {
    isAuthenticated : isAuthenticated,
    success : success,
    hasBeenSent : hasBeenSent,
    locationName : locationName,
    locationAddress : locationAddress
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createLocation: (data) => dispatch(createLocation(data)),
    saveLocationForm: (data) => dispatch(saveLocationForm(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationRegistration)
