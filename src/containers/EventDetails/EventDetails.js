import { fetchEventDetails } from '../../actions/eventQueryActions'
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import style from './style'

class EventDetails extends Component {
  componentDidMount() {
    const { eventId } = this.props.navigation.state.params;
    const { fetchEventDetails } = this.props;
    fetchEventDetails(eventId);
  }

  render() {
    const { event, isPending, errorMsg } = this.props;
    return (
      <View>
        {event &&
          <View>
            <Text>{event.name}</Text>
            <Text>{event.descriptionIce}</Text>
          </View>
        }
        {errorMsg && <Text>{errorMsg}</Text>}
        {isPending && <Text>Er að sækja sjomli</Text>}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, isPending, errorMsg } = state.event.query.eventDetails;
  console.log(state.event.query.eventDetails)
  return {
    event: data,
    isPending: isPending,
    error: errorMsg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEventDetails: (eventId) => dispatch(fetchEventDetails(eventId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails)
