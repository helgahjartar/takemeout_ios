import React, { Component } from 'react';
import { Text, ListView, View, TextInput, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from './style';
import { connect } from 'react-redux'
import { createPerformer, savePerformerForm } from '../../actions/eventRegistrationActions';
import { validateInput, validateDescription, returnPerformerFormErrors } from '../Helpers/validators'

class PerformerRegistration extends Component {

  initialFormData() {
    return {
      name: '',
      descriptionIce: '',
      descriptionEng: ''
    }
  }

  constructor(props) {
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const errors = returnPerformerFormErrors(this.state.formData);
     if (errors.value != null) {
       event.preventDefault();
       console.log(errors);
       alert("Form er vitlaust fyllt út");
       return;
     }
     const { formData } = this.state;
     const { dispatchCreatePerformer } = this.props;

     dispatchCreatePerformer(formData);
     this.setState({ formData: this.initialFormData() })
  }

  componentWillMount() {
    const { savedFormData } = this.props;
    const data = savedFormData ? savedFormData : this.initialFormData();
    this.state = {
      formData: data,
      formWasSent: false
    }
  }

  componentWillUnmount() {
    const { dispatchSavePerformerForm, isPending } = this.props;
    console.log(this.state.formData)
    dispatchSavePerformerForm(this.state.formData);
  }

  setFormDataState(newState) {
    const { formData } = this.state;
    this.setState({ formData: Object.assign({}, formData, newState) });
  }

  render() {
    const { formData } = this.state;
    const { isAuthenticated } = this.props;
    const { isPending, errorMsg, savedFormData } = this.props;

    const performer = errorMsg && savedFormData ? savedFormData : formData;

    return (
      <View style={style.container}>
        <View style={style.mainTitleContainerPer}>
          <Text style={style.mainTitleText}>Skráðu upplýsingar um flytjanda</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Nafn flytjanda:</Text>
          <TextInput
            style={style.inputText}
            value={performer.name}
            onChangeText={(value) => this.setFormDataState({ name: value })}
          />
          <Text style={style.helperText}>{validateInput(performer.name)}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Lýsing á íslensku:</Text>
          <TextInput
            style={style.descText}
            value={performer.descriptionIce}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(value) => this.setFormDataState({ descriptionIce: value })}
          />
          <Text style={style.helperText}>{validateDescription(performer.descriptionIce)}</Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.titleText}>Lýsing á ensku:</Text>
          <TextInput
            style={style.descText}
            value={performer.descriptionEng}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(value) => this.setFormDataState({ descriptionEng: value })}
          />
          <Text style={style.helperText}>{validateDescription(performer.descriptionEng)}</Text>
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
  const { isPending, errorMsg, performerForm } = state.event.registration;

  console.log(state)

  return {
    isPending : isPending,
    errorMsg : errorMsg,
    savedFormData: performerForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreatePerformer: (data) => dispatch(createPerformer(data)),
    dispatchSavePerformerForm: (data) => dispatch(savePerformerForm(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformerRegistration)
