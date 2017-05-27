import { StyleSheet, Dimensions } from 'react-native' ;

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    backgroundColor: '#F0F9FD',
    alignItems: 'center',

  },
  errorImg: {
    width: deviceWidth,
    height: deviceWidth
  },
  errorHeader: {

  },
  errorText: {

  }
});
