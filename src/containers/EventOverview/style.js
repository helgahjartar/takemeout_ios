import { StyleSheet } from 'react-native' ;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#BEBEBE',
  },
  eventNameText: {
    fontSize: 16,
    color: '#0099CC'
  },
  eventRow: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 5,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
  },
  locationText: {
    fontSize: 12,
    color: '#0099CC'
  },
  typeText: {
    fontSize: 12,
    color: '#FF8800'
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF'
  },
  dateRow: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 5,
    paddingRight: 20,
    backgroundColor: '#FFBB33'
  },
});
