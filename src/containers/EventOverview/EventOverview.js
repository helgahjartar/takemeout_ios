import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, ListView, View } from 'react-native';
import EventRow from './EventRow';
import DateRow from './DateRow';
import style from './style'
import { connect } from 'react-redux'
import { fetchEvents } from '../../actions/index'



class EventOverview extends Component {
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
    const { fetchEvents } = this.props;
    fetchEvents();
    this.state = {
      ds : ds
    };
  }

  render() {
    const { events } = this.props;
    const { ds } = this.state;
    dataSource = ds.cloneWithRowsAndSections(events.dataBlob, events.sectionIds, events.rowIds)
    return (
      <ListView
        style={style.container}
        dataSource={dataSource}
        renderRow={(event) => <EventRow event={event} />}
        renderSectionHeader={(date) => <DateRow date={date} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={style.separator} />}
      />
    );
  }
}

function mapStateToProps(state) {
  const { events } = state.registration
  return {
    events : events
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventOverview)
