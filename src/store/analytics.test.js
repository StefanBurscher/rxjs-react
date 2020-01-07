import React from 'react';
import ReactDOM from 'react-dom';
import analyticsStore from './analytics';

const state = analyticsStore.initialState

function setState(newState) {
  state = newState
}

it('Should add temp', () => {
    analyticsStore.subscribe(setState)
    analyticsStore.setTemperature(2)
    console.log(analyticsStore.getCurrentValues)
    expect(state.temperatureData.data).toBe(2);
});
