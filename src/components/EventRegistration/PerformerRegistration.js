import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import { connect } from 'react-redux'
import { createPerformer, savePerformerForm } from '../../actions/index'
import { validateInput, validateDescription, returnPerformerFormErrors } from '../Helpers/validators'

class PerformerRegistration extends Component {

  constructor(props) {
     super(props);
     this.state = {newForm: true, performer: '', descriptionIce: '', descriptionEng: ''};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const errors = returnPerformerFormErrors(this.state);
     const { createPerformer } = this.props;
     if (errors.value != null) {
       event.preventDefault();
       console.log(errors);
       alert("Form er vitlaust fyllt út");
       return;
     }
     createPerformer(this.state);
     this.state.newForm = false;
  }

  componentDidMount() {
    if (this.props.performerName) this.setState({ performer : this.props.performerName});
    if (this.props.performerDescIce) this.setState({ descriptionIce : this.props.performerDescIce});
    if (this.props.performerDescEng) this.setState({ descriptionEng : this.props.performerDescEng});
  }

  componentDidUpdate() {
   const { savePerformerForm } = this.props;
   savePerformerForm(this.state);
  }


  render() {
    const { performer, descriptionIce, descriptionEng, newForm} = this.state;
    const { success, hasBeenSent, isAuthenticated, performerName, performerDescIce, performerDescEng } = this.props;
    return (
      <View style={style.container}>
        <View style={style.mainTitleContainerPer}>
          <Text style={style.mainTitleText}>Skráðu upplýsingar um flytjanda</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Nafn flytjanda:</Text>
          <TextInput
          style={style.inputText}
          value={performer}
          onChangeText={(performer) => this.setState({ performer })}
          />
          <Text style={style.helperText}>{validateInput(performer)}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Lýsing á íslensku:</Text>
          <TextInput
          style={style.descText}
          value={descriptionIce}
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(descriptionIce) => this.setState({ descriptionIce })}
          />
          <Text style={style.helperText}>{validateDescription(descriptionIce)}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Lýsing á ensku:</Text>
          <TextInput
          style={style.descText}
          value={descriptionEng}
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(descriptionEng) => this.setState({ descriptionEng })}
          />
          <Text style={style.helperText}>{validateDescription(descriptionEng)}</Text>
        </View>
        <View style={style.buttonBackgroundPer}>
          <Button
            color='#FFFFFF'
            title='Skrá flytjanda'
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
  const { performerName, performerDescIce, performerDescEng } = state.formSave

  console.log(state)

  return {
    isAuthenticated : isAuthenticated,
    success : success,
    hasBeenSent : hasBeenSent,
    performerName : performerName,
    performerDescIce : performerDescIce,
    performerDescEng : performerDescEng
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPerformer: (data) => dispatch(createPerformer(data)),
    savePerformerForm: (data) => dispatch(savePerformerForm(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformerRegistration)
