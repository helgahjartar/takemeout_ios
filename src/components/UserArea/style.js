import { StyleSheet } from 'react-native' ;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5
  },
  titleContainer: {
    flex: 0.55,
    paddingLeft: 35,
    paddingRight: 35,
  },
  titleAuthContainer: {
    flex: 0.10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  mainTitleContainer: {
    flex: 0.55,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 45,
    paddingTop: 35,
  },
  authMainTitleContainer: {
    flex: 0.25,
    paddingLeft: 35,
    paddingRight: 2,
    paddingBottom: 2,
    paddingTop: 35,
  },
  mainTitleText: {
    fontSize: 30,
    paddingBottom: 60,
  },
  titleText: {
    fontSize: 16,
    paddingBottom:10,
  },
  inputText: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    //backgroundColor: '#FFFFFF',
  },
  buttonBackground: {
    flex: 0.1,
    marginTop: 5,
    marginLeft: 90,
    marginBottom: 5,
    marginRight: 90,
    backgroundColor: '#FFBB33',
  },
  buttonAuthBackground: {
    flex: 0.1,
    marginTop: 90,
    marginLeft: 90,
    marginBottom: 270,
    marginRight: 90,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#FFBB33',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10
  }
});
