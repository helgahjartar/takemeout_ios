import { handleActions } from 'redux-actions';
import { FETCH_EVENTS } from '../actions/eventQueryActions';
import { CREATE_EVENT } from '../actions/eventRegistrationActions';

const initialState = {
  overview: {
    isPending: true,
    errorMsg: null,
    eventData: {
      dataBlob: {},
      sectionIds: [],
      rowIds: []
    }
  },
  registration: {
    isPending: false,
    success: false,
    hasBeenSent: false
  }
};

export default handleActions({
  [`${CREATE_EVENT}_PENDING`]: (state, action) => ({
    registration: {
      isPending: true,
      success: false,
      hasBeenSent: false
    }
  }),

  [`${CREATE_EVENT}_REJECTED`]: (state, action) => ({
    registration: {
      isPending: false,
      success: false,
      hasBeenSent: true
    }
  }),

  [`${CREATE_EVENT}_FULFILLED`]: (state, action) => ({
    registration: {
      isPending: false,
      success: true,
      hasBeenSent: true
    }
  }),

  [`${FETCH_EVENTS}_PENDING`]: (state, action) => ({
    overview: {
      isPending: true,
      errorMsg: null,
      eventData: {
        dataBlob: {},
        sectionIds: [],
        rowIds: []
      }
    }
  }),

  [`${FETCH_EVENTS}_REJECTED`]: (state, action) => ({
    overview: {
      isPending: false,
      errorMsg: action.errorMsg,
      eventData: {
        dataBlob: {},
        sectionIds: [],
        rowIds: []
      }
    }
  }),

  [`${FETCH_EVENTS}_FULFILLED`]: (state, action) => ({
    overview: {
      isPending: false,
      errorMsg: null,
      eventData: formatEvents(action.payload)
    }
  })
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
