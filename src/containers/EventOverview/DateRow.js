import { Component } from 'react';
import { Text, View } from 'react-native';

class DateRow extends Component {
  render() {
    const { date } = this.props;
    return (
      <View>
        <Text>{date}</Text>
      </View>
    );
  }
}
