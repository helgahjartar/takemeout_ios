import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, ListView, View, ActivityIndicator } from 'react-native';
import EventRow from './EventRow';
import DateRow from './DateRow';
import style from './style';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/eventQueryActions';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import LoadingSymbolOverlay from '../../components/LoadingSymbolOverlay/LoadingSymbolOverlay';

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
    const { isPending, errorMsg, events } = this.props;

    let viewBody;
    if (isPending) {
      viewBody = (
        <View>
          <LoadingSymbolOverlay />
        </View>
      )
    }

    else if(errorMsg) {
      viewBody = (
        <ErrorScreen errorMsg={errorMsg} />
      )
    } else {
      const { ds } = this.state;
      dataSource = ds.cloneWithRowsAndSections(events.dataBlob, events.sectionIds, events.rowIds);
      viewBody =  (
        <ListView
          style={style.container}
          dataSource={dataSource}
          renderRow={(event) => <EventRow event={event} />}
          renderSectionHeader={(date) => <DateRow date={date} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={style.separator} />}
        />
      )
    }

    return viewBody;
  }
}

function mapStateToProps(state) {
  const { isPending, errorMsg, eventData } = state.event.overview;
  console.log(eventData);
  return {
    isPending : isPending,
    errorMsg : errorMsg,
    events : eventData
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
