import WeatherCard from "./WeatherCard.js";
import "./App.css";
import { Button, Card, Form, Row, Col, Container, ButtonGroup, ToggleButton} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QueryData from "./QueryData.js";

function WeatherPage() {
  const [measurement, setMeasurement] = useState(1);
  const [days, setDays] = useState([]);
  const [formData, setFormData] = useState("");
  const [locations, setLocation] = useState([]);
  const [isChecked, setChecked] = useState("1");
  const measurements = [
    { name: "°F", value: "1" },
    { name: "°C", value: "2" },
  ];
  var cityQuery = formData;

  useEffect(() => {
    setData();
  }, [formData]);

  const onFormSubmit = (event) => {
    setFormData(cityQuery);
    event.preventDefault();
  };

  const onFormChange = (event) => {
    cityQuery = event.target.value;
  };

  //Change Between Celsius and Fahrenheit
  function changeMeasurement() {
    return measurement === 1 ? setMeasurement(2) : setMeasurement(1);
  }

  //Query Backend & Populate Temp/Condition Arrays with Location Result
  async function setData() {
    let { tempDays, locationData } = await QueryData(cityQuery);
    setDays(tempDays);
    setLocation(locationData);
  }

  return (
    <div>
      <header className="App-header"></header>
      <body>
        <Form onSubmit={onFormSubmit}>
          <Container className="mt-3">
            <Row className="justify-content-center" xs="auto">
              <h1 className="text">Find Your Weather</h1>
            </Row>
          </Container>
          <Container className="mt-3">
            <Row className="justify-content-center" xs="auto">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                {" "}
                <Button type="submit">Go</Button>{" "}
              </Col>
              <Col>
                <ButtonGroup>
                  {measurements.map((measurement, idx) => (
                    <ToggleButton
                      key={Math.random()}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={(idx = 1 ? "outline-success" : "outline-danger")}
                      name="radio"
                      value={measurement.value}
                      checked={isChecked === measurement.value}
                      onChange={(e) => {
                        setChecked(e.currentTarget.value);
                        changeMeasurement();
                      }}
                    >
                      {measurement.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </Form>

        {/* Weather Cards */}

        <Container className="mt-5">
          <Row className="justify-content-center" xs="auto">
            <h1>
              {locations[0] === undefined
                ? ""
                : locations[0] + ", " + locations[1] + ", " + locations[2]}
            </h1>
          </Row>
          <Row className="justify-content-center">
            {days.map((day) => (
              <WeatherCard day={day} measurement={measurement} />
            ))}
          </Row>
        </Container>
        <Card.Footer
          className="custom-footer"
          style={{ backgroundColor: "grey" }}
        >
          <p>
            This website is a passion project and is not intended for detailed
            weather reports. Please direct any questions, comments, or concerns
            to ezramoss4@gmail.com
          </p>
        </Card.Footer>
      </body>
    </div>
  );
}

export default WeatherPage;
