//export default './Container';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry, Text, View, Button } from 'react-native';

export default class EventOverview extends Component {
  render() {
    const eventDict = mockEventList();
    return (
      <View>
        {Object.keys(eventDict).map((date,i) =>
            <View key={i}>
              <Text>{date}</Text>
            </View>
            {eventDict[date].map((event,j) =>
              <View key={j}>
                <Text>{event.name}</Text>
              </View>
            )}
        )}
      </View>
    );
  }
}

function mockEventList() {
  const events = [
    {
      name: 'Prins Póló off-venue',
      location: 'Prikið',
      date: '2017-09-03',
      type: 'Tónleikar'
    },
    {
      name: 'Moses Hightower og Babies á Húrra',
      location: 'Húrra',
      date: '2017-09-03',
      type: 'Tónleikar'
    },
    {
      name: 'McGauti og Sturla Atlas',
      location: 'Prikið',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      name: 'Boogie Trouble lokatónleikar',
      location: 'Loft Hostel',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      name: 'Útgáfutónleikar Oyama',
      location: 'Kex',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      name: 'Forsýning á nýju myndbandi Berndsen',
      location: 'Kex',
      date: '2017-10-11',
      type: 'Tónleikar'
    }
  ]
  const eventDict = {};
  events.map(event => {
      if (!eventDict[event.date]) eventDict[event.date] = [];
      eventDict[event.date].push(Object.assign({}, event));
  });
  return eventDict;
}
