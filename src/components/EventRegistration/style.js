import { StyleSheet } from 'react-native' ;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 0.05,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 10,
  },
  inputContainerLoc: {
    flex: 0.05,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 10,
  },
  mainTitleContainer: {
    flex: 0.18,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 10,
    paddingTop: 10,
  },
  mainTitleContainerLoc: {
    flex: 0.06,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 20,
    paddingTop: 10,
  },
  mainTitleContainerPer: {
    flex: 0.04,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 15,
    paddingTop: 10,
  },
  mainTitleText: {
    fontSize: 30,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 16,
    paddingBottom:10,
  },
  helperText: {
    fontSize: 12,
    color: '#FF6347',
    padding: 5
  },
  inputText: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 3,
  },
  descText: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 3,
  },
  dateStyle: {
    height: 50,
    width: 50,
  },
  buttonBackground: {
    flex: 0.03,
    marginTop: 5,
    marginLeft: 90,
    marginBottom: 29,
    marginRight: 90,
    backgroundColor: '#FFBB33',
  },
  buttonBackgroundLoc: {
    flex: 0.02,
    marginTop: 40,
    marginLeft: 90,
    marginBottom: 29,
    marginRight: 90,
    backgroundColor: '#FFBB33',
  },
  buttonBackgroundPer: {
    flex: 0.02,
    marginTop: 40,
    marginLeft: 90,
    marginBottom: 29,
    marginRight: 90,
    backgroundColor: '#FFBB33',
  },
  button: {
    backgroundColor: '#FFBB33',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10
  },
  timeComponent: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginBottom: 15,
  },
  pickerComponent: {
    marginTop: 0,
  },
  locationComponent: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginBottom: 15,
    height: 15,
  },
});
