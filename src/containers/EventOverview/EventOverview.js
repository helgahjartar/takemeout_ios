//export default './Container';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, ListView, View } from 'react-native';
import EventRow from './EventRow';
import DateRow from './DateRow';
import style from './style'

export default class EventOverview extends Component {
  constructor(props) {
    super(props);

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[sectionId + ':' + rowId];

    const ds = new ListView.DataSource({
      rowHasChanged : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData
    });

    const { dataBlob, sectionIds, rowIds } = formatData(mockEventList());
    this.state = {
      dataSource : ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    };
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        style={style.container}
        dataSource={this.state.dataSource}
        renderRow={(event) => <EventRow event={event} />}
        renderSectionHeader={(date) => <DateRow date={date} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={style.separator} />}
      />
    );
  }
}

function formatData(events) {
  // make a date => [ ...event ] dictionary
  const eventDict = {};
  events.map(event => {
      if (!eventDict[event.date]) eventDict[event.date] = [];
      eventDict[event.date].push(event);
  });

  const dataBlob = {};
  const sectionIds = Object.keys(eventDict).sort();
  const rowIds = [];

  sectionIds.map((date, index) => {
    dataBlob[date] = date;
    rowIds[index] = eventDict[date].map(event => {
      dataBlob[date + ':' + event.id] = event;
      return event.id;
    });
  });

  return { dataBlob, sectionIds, rowIds };
}

function mockEventList() {
  const events = [
    {
      id: 6,
      name: 'Forsýning á nýju myndbandi Berndsen',
      location: 'Kex',
      date: '2017-10-11',
      type: 'Tónleikar'
    },
    {
      id: 3,
      name: 'Emmsjé Gauti og Sturla Atlas',
      location: 'Prikið',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      id: 1,
      name: 'Prins Póló off-venue',
      location: 'Prikið',
      date: '2017-09-03',
      type: 'Tónleikar'
    },
    {
      id: 4,
      name: 'Boogie Trouble lokatónleikar',
      location: 'Loft Hostel',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      id: 5,
      name: 'Útgáfutónleikar Oyama',
      location: 'Kex',
      date: '2017-09-08',
      type: 'Tónleikar'
    },
    {
      id: 2,
      name: 'Moses Hightower og Babies á Húrra',
      location: 'Húrra',
      date: '2017-09-03',
      type: 'Tónleikar'
    }
  ]
  return events;
}
