import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import { connect } from 'react-redux'
import { createUser } from '../../actions/index'
import { validateInput, validateEmail, validatePassword, getValidationState, getEmailValidationState, getPasswordValidationState } from './validators'

class UserRegistration extends Component {

  constructor(props) {
     super(props);
     this.state = {userName: '', email: '', passwordHash: '', confirmPassword: ''};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const { createUser } = this.props;
     //this.state.passwordHash = hash(this.state.passwordHash)
     createUser(this.state);
     console.log(this.state);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { userName, passwordHash, email, confirmPassword } = this.state;
    return (
      <View style={style.container}>
        <View style={style.mainTitleContainer}>
          <Text style={style.mainTitleText}>Skráðu notendaupplýsingar</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Notendanafn:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn notendanafn"
          value={userName}
          onChangeText={(userName) => this.setState({ userName })}
          />
          <Text style={style.helperText}>{validateInput(userName)}</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Tölvupóstur:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn tölvupóst"
          value={email}
          onChangeText={(email) => this.setState({ email })}
          />
          <Text style={style.helperText}>{validateEmail(email)}</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Lykilorð:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn lykilorð"
          value={passwordHash}
          onChangeText={passwordHash => this.setState({ passwordHash })}
          secureTextEntry={true}
          />
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Lykilorð aftur:</Text>
          <TextInput
          style={style.inputText}
          placeholder="Sláðu inn lykilorð aftur"
          value={confirmPassword}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          secureTextEntry={true}
          />
          <Text style={style.helperText}>{validatePassword(passwordHash, confirmPassword)}</Text>
        </View>
        <View style={style.buttonBackground}>
          <Button
            color='#FFFFFF'
            title='Skrá notanda'
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { registrationError, errorMessage } = state.userAuth

  return {
    registrationError: registrationError,
    errorMessage: errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (data) => dispatch(createUser(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRegistration)
