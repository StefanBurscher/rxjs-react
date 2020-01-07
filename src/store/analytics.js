import { Subject } from 'rxjs';

const subject = new Subject();
const initialState = {
  // Flag that is changed to true when all systems emits at least one value
  firstEmitDone: false,

  // Temperature data
  temperatureData: {
    data: null,
    lastEmit: null
  },
  // Air pressure data
  airPressureData: {
    data: null,
    lastEmit: null
  },
  // Humidity data
  humidityData: {
    data: null,
    lastEmit: null
  }
};

let state = initialState;

const analyticsStore = {
  init: () => {
    state = initialState
    subject.next(state)
  },
  subscribe: setState => subject.subscribe(setState),
  setTemperature: temperature => {
    const { airPressureData, humidityData } = state
    state = {
      ...state,
      ...getAnalyticsObject({ data: temperature, lastEmit: Date.now()}, airPressureData, humidityData)
    };
    if(state.firstEmitDone) subject.next(state);
  },
  setAirPressure: airPressure => {
    const { temperatureData, humidityData } = state
    state = {
      ...state,
      ...getAnalyticsObject(temperatureData, { data: airPressure, lastEmit: Date.now()}, humidityData)
    };
    if(state.firstEmitDone) subject.next(state);
  },
  setHumidity: humidity => {
    const { temperatureData, airPressureData } = state
    state = {
      ...state,
      ...getAnalyticsObject(temperatureData, airPressureData, { data: humidity, lastEmit: Date.now()})
    };
    if(state.firstEmitDone) subject.next(state);
  },
  getCurrentValues: () => {
    return state
  },
  initialState
};

function getAnalyticsObject(temperatureData, airPressureData, humidityData) {
  const currentTimestamp = Date.now()

  let temperature = temperatureData
  if(currentTimestamp - temperatureData.lastEmit >= 1000) { temperature.data = null }

  let airPressure = airPressureData
  if(currentTimestamp - airPressureData.lastEmit >= 1000) { airPressure.data = null }

  let humidity = humidityData
  if(currentTimestamp - humidityData.lastEmit >= 1000) { humidity.data = null }

  return {
    firstEmitDone: state.firstEmitDone || !!(temperatureData.data && airPressureData.data, humidityData.data),
    temperatureData: temperature,
    airPressureData: airPressure,
    humidityData: humidity
  }
}

export default analyticsStore;
