import { handleActions } from 'redux-actions';
import { FETCH_EVENTS, FETCH_PERFORMERS, FETCH_TYPES, FETCH_LOCATIONS } from '../actions/eventQueryActions';

const initialState = {
  events: {
    isPending: true,
    errorMsg: null,
    eventData: {
      dataBlob: {},
      sectionIds: [],
      rowIds: []
    }
  },
  locations: {
    isPending: false,
    errorMsg: null,
    data: []
  },
  performers: {
    isPending: false,
    errorMsg: null,
    data: []
  },
  types: {
    isPending: false,
    errorMsg: null,
    data: []
  }
};

export default handleActions({
  [`${FETCH_EVENTS}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      events: {
        isPending: true,
        errorMsg: null,
        eventData: {
          dataBlob: {},
          sectionIds: [],
          rowIds: []
        }
      }
    });
  },

  [`${FETCH_EVENTS}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      events: {
        isPending: false,
        errorMsg: action.payload,
        eventData: {
          dataBlob: {},
          sectionIds: [],
          rowIds: []
        }
      }
    });
  },

  [`${FETCH_EVENTS}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      events: {
        isPending: false,
        errorMsg: null,
        eventData: formatEvents(action.payload)
      }
    });
  },

  [`${FETCH_LOCATIONS}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      locations: {
        isPending: true,
        errorMsg: null,
        data: []
      }
    });
  },

  [`${FETCH_LOCATIONS}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      locations: {
        isPending: false,
        errorMsg: action.payload,
        data: []
      }
    });
  },

  [`${FETCH_LOCATIONS}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      locations: {
        isPending: false,
        errorMsg: null,
        data: formatForPicker(action.payload, (l) => l.id, (l) => l.name)
      }
    });
  },

  [`${FETCH_PERFORMERS}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      performers: {
        isPending: true,
        errorMsg: null,
        data: []
      }
    });
  },

  [`${FETCH_PERFORMERS}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      performers: {
        isPending: false,
        errorMsg: action.payload,
        data: []
      }
    });
  },

  [`${FETCH_PERFORMERS}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      performers: {
        isPending: false,
        errorMsg: null,
        data: formatForPicker(action.payload, (p) => p.id, (p) => p.name)
      }
    });
  },

  [`${FETCH_TYPES}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      types: {
        isPending: true,
        errorMsg: null,
        data: []
      }
    });
  },

  [`${FETCH_TYPES}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      types: {
        isPending: false,
        errorMsg: action.payload,
        data: []
      }
    });
  },

  [`${FETCH_TYPES}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      types: {
        isPending: false,
        errorMsg: null,
        data: formatForPicker(action.payload, (t) => t.id, (t) => t.descriptionIce)
      }
    });
  }

}, initialState);

function formatForPicker(data, valueF, labelF) {
  pickerData = [];
  data.sort((a, b) => compare(a.name, b.name));
  data.map((d, i) => {
    pickerData.push({ key: i, value: valueF(d), label: labelF(d) });
  });
  return pickerData;
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

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
