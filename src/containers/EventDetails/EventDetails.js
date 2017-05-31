import { fetchEventDetails } from '../../actions/eventQueryActions'
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View, Image } from 'react-native';
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
      <View style={style.container}>
        {event &&
          <View style={style.titleContainer}>
            <Text style={style.title}>{event.name}</Text>
            <Text style={style.underline}>{'Staðsetning'.toUpperCase()}</Text>
            <Text style={style.description}>{event.locationName}</Text>
            <Text style={style.underline}>{'Heimilisfang'.toUpperCase()}</Text>
            <Text style={style.description}>{event.address}</Text>
            <Text style={style.underline}>{'Aðgengi'.toUpperCase()}</Text>
            <Text style={style.description}>{event.access}</Text>
            <Text style={style.underline}>{'Um viðburð'.toUpperCase()}</Text>
            <Text style={style.description}>{event.descriptionIce}</Text>
          </View>
        }
        {errorMsg && <Text>{errorMsg}</Text>}
        {isPending && <Text style={style.description}>Er að sækja viðburð...</Text>}
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
