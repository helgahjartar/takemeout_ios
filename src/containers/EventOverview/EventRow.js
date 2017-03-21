import { Component } from 'react';
import { Text, View } from 'react-native';

class EventRow extends Component {
  render() {
    const { event } = this.props;
    const eventDict = mockEventList();
    return (
      <View style={styles.container}>
        {Object.keys(eventDict).map( (date, i) => {
            <View>
              <Text>{}</Text>
            </View>
        )}
        <Button title="Klikkað" onPress={() => navigate('Bar', { name: 'Nafn' }) } />
      </View>
    );
  }
}
