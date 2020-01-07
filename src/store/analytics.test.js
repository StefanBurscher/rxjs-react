import analyticsStore from './analytics';

it('Should emit temperature with data 28', () => {
    analyticsStore.setTemperature(28)
    expect(analyticsStore.getCurrentValues().temperatureData.data).toBe(28);
});

it('Should emit air pressure with data 9.8', () => {
    analyticsStore.setAirPressure(9.8)
    expect(analyticsStore.getCurrentValues().airPressureData.data).toBe(9.8);
});

it('Should emit huminity with data 2', () => {
    analyticsStore.setHumidity(2)
    expect(analyticsStore.getCurrentValues().humidityData.data).toBe(2);
});