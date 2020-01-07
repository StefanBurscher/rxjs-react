import React, { useState, useLayoutEffect } from "react";
import analyticsStore from '../../../store/analytics';
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  const [analyticsState, setAnalyticsState] = useState(analyticsStore.initialState);

  useLayoutEffect(()=> {
    const subs = analyticsStore.subscribe(setAnalyticsState);
    analyticsStore.init();

    // Event Emitter usage example

    // const temperature = new EventEmitter();
    // temperature.on('data', data => { analyticsStore.setTemperature(data) })

    // const airPressure = new EventEmitter();
    // airPressure.on('data', data => { analyticsStore.setAirPressure(data) })

    // const humidity = new EventEmitter();
    // humidity.on('data', data => { analyticsStore.setHumidity(data) })


    // Data demo, so you can see the simulation!
    setInterval(() => {
      analyticsStore.setTemperature(1)
      setTimeout(() => analyticsStore.setAirPressure(6), 300)
      setTimeout(() => analyticsStore.setHumidity(3), 800)

      setTimeout(() => analyticsStore.setHumidity(8), 1500)

      setTimeout(() => analyticsStore.setTemperature(37), 2800)
      setTimeout(() => analyticsStore.setAirPressure(0.9), 3000)
    }, 4000)

    return () => subs.unsubscribe();
  },[]);

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <Card className="py-4">
            Temperature <br />
            {analyticsState.temperatureData.data || "N/A"}
          </Card>
        </Col>
        <Col>
          <Card className="py-4">
            Air pressure <br />
            {analyticsState.airPressureData.data || "N/A"}
          </Card>
        </Col>
        <Col>
          <Card className="py-4">
            Humidity <br />
            {analyticsState.humidityData.data || "N/A"}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;