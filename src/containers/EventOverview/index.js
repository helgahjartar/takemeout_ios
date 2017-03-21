//export default './Container';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry, Text, View, Button } from 'react-native';

export default class EventOverview extends Component {
  render() {
    const eventDict = mockEventList();
    return(
      <ListView
        dataSource={eventDict}
        renderRow={}
      />
    );
  }
}

function mockEventList() {
  const events = [
    {
      name: 'Prins Póló off-venue',
      address: 'Prikið',
      date: '2017-09-03',
      type: 'Tónleikar'
    },
    {
      name: 'Moses Hightower og Babies á Húrra',
      address: 'Húrra',
      date: '2017-09-03',
      type: 'Tónleikar'
    },
    {
      name: 'McGauti og Sturla Atlas',
      address: 'Prikið',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      name: 'Boogie Trouble lokatónleikar',
      address: 'Loft Hostel',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      name: 'Útgáfutónleikar Oyama',
      address: 'Kex',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      name: 'Forsýning á nýju myndbandi Berndsen',
      address: 'Kex',
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
