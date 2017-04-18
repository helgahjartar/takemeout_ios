import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button } from 'react-native';
import style from './style';
import { logInUser, logOutUser, receiveLogin, loginError } from '../../actions/index'
import { connect } from 'react-redux'

class UserAuthentication extends Component {
  constructor(props) {
     super(props);
     this.state = {userName: '', passwordHash: ''};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const { logInUser } = this.props;
     //this.state.passwordHash = hash(this.state.passwordHash)
     logInUser(this.state);
     console.log(this.state);
  }

  render() {
    const { userName, passwordHash} = this.state;
    const { logOutUser, isAuthenticated, hasBeenSent } = this.props;
    const { navigate } = this.props.navigation;

    return (
        <View style={style.container}>
        <View style={style.authMainTitleContainer}>
          <Text style={style.mainTitleText}>Skráðu þig inn</Text>
        </View>
        <View style={style.titleAuthContainer}>
          <TextInput
          style={style.inputText}
          placeholder="Notendanafn"
          value={userName}
          onChangeText={(userName) => this.setState({ userName })}
          />
        </View>
        <View style={style.titleAuthContainer}>
          <TextInput
          style={style.inputText}
          placeholder="Lykilorð"
          value={passwordHash}
          onChangeText={passwordHash => this.setState({ passwordHash })}
          secureTextEntry={true}
          />
        </View>
        <View style={style.buttonAuthBackground}>
          <View style={style.button}>
              <Button
                color='#FFFFFF'
                title='Innskrá'
                onPress={this.handleSubmit}
              />
            </View>
            <View style={style.button}>
              <Button
                color='#FFFFFF'
                title='Skrá nýjan notanda'
                onPress={this.handleSubmit}
                onPress={() => navigate('UserRegistration')}
              />
            </View>
        </View>

        {!isAuthenticated && hasBeenSent &&
         <h3>Notendanafn eða lykilorð vitlaust </h3>
        }
        </View>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, hasBeenSent } = state.userAuth

  console.log(state)

  return {
    isAuthenticated : isAuthenticated,
    hasBeenSent : hasBeenSent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logInUser: (data) => dispatch(logInUser(data)),
    logOutUser: () => dispatch(logOutUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuthentication)
