import { StyleSheet } from 'react-native' ;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 48
  },
  buttonContainer: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonInnerContainer: {
    flexDirection: 'row'
  },
  buttonBackground: {
    flex: 0.2,
    marginTop: 5,
    marginLeft: 50,
    marginBottom: 5,
    marginRight: 50,
    backgroundColor: '#FFBB33'
  }
});
