import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button } from 'react-native';
import style from './style';
import { login, logOutUser, receiveLogin, loginError } from '../../actions/userAuthActions';
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
        {!isAuthenticated && !hasBeenSent &&
        <View style={style.authMainTitleContainer}>
          <Text style={style.mainTitleText}>Skráðu þig inn</Text>
        </View>
        }
        {isAuthenticated && hasBeenSent &&
        <View style={style.authMainTitleContainer}>
          <Text style={style.mainTitleText}>Vertu velkomin {this.state.userName}! </Text>
            <View style={style.buttonLoggedIn}>
              <Button
                  color='#FFFFFF'
                  title='Skrá viðburð'
                  onPress={() => navigate('EventRegContainer')}
                />
              </View>
              <View style={style.buttonLoggedIn}>
              <Button
                color='#FFFFFF'
                title='Skoða viðburði'
                onPress={() => navigate('EventOverview')}
              />
            </View>
            <View style={style.buttonLoggedIn}>
            <Button
              color='#FFFFFF'
              title='Skrá mig út'
              onPress={logOutUser}
            />
          </View>
        </View>
      }
        {!isAuthenticated && !hasBeenSent &&
        <View style={style.titleAuthContainer}>
          <TextInput
          autoCapitalize="none"
          style={style.inputText}
          placeholder="Notendanafn"
          value={userName}
          onChangeText={(userName) => this.setState({ userName })}
          />
        </View>
      }
        {!isAuthenticated && !hasBeenSent &&
        <View style={style.titleAuthContainer}>
          <TextInput
          style={style.inputText}
          placeholder="Lykilorð"
          value={passwordHash}
          onChangeText={passwordHash => this.setState({ passwordHash })}
          secureTextEntry={true}
          />
          {!isAuthenticated && hasBeenSent && <Text style={style.helperText}>Notendanafn eða lykilorð er vitlaust</Text> }
        </View>
      }
      {!isAuthenticated && !hasBeenSent &&
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
                onPress={() => navigate('UserRegistration')}
              />
            </View>
        </View>
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
    logInUser: (data) => dispatch(login(data)),
    logOutUser: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuthentication)
