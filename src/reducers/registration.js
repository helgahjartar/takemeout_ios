import { handleActions } from 'redux-actions'
import { RECEIVE_EVENTS, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE } from '../actions/index'

const initialState = { events: { dataBlob: {}, sectionIds: [], rowIds: [] }, success: false, hasBeenSent: false};

export default handleActions({

  RECEIVE_EVENTS (state, action) {
    return Object.assign({}, state, {
      events: formatEvents(action.events)
    });
  },

  CREATE_EVENT_SUCCESS (state, action) {
    return Object.assign({}, state, {
      success: true,
      hasBeenSent: true
    });
  },

  CREATE_EVENT_FAILURE (state, action) {
    return Object.assign({}, state, {
      sucess: false,
      hasBeenSent: true
    })
  }

}, initialState);

function formatEvents(events) {
  const eventDict = {};
  events.map(event => {
      if (!eventDict[event.time]) eventDict[event.time] = [];
      eventDict[event.time].push(event);
  });

  const dataBlob = {};
  const sectionIds = Object.keys(eventDict).sort();
  const rowIds = [];

  sectionIds.map((time, index) => {
    dataBlob[time] = time;
    rowIds[index] = eventDict[time].map(event => {
      dataBlob[time + ':' + event.id] = event;
      return event.id;
    });
  });

  return { dataBlob: dataBlob, sectionIds: sectionIds, rowIds: rowIds };
}
