import "./App.css";
import { Button, Card, Form, Row, Col, Container, ButtonGroup, ToggleButton, Image,} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Day from "./Day.js";

var globalLocations = new Array(3)
var globalMeasurement = 1

function WeatherWebsite() {
  const [measurement, setMeasurement] = useState(1);
  const [days, setDays] = useState([]);
  const [formData, setFormData] = useState("");
  const [locations, setLocation] = useState([])
  const [newQuery, setQuery] = useState(1)
  const [isChecked, setChecked] = useState("1");
  const measurements = [
    { name: "°F", value: "1" },
    { name: "°C", value: "2" },
  ];
  var cityQuery = formData

  //Change Between Celsius and Fahrenheit
  function changeMeasurement() {
    return measurement === 1 ? (globalMeasurement = 2, setMeasurement(2)):
      (globalMeasurement = 1, setMeasurement(1));
  }

  //Query Backend & Populate Temp/Condition Arrays with Location Result
  useEffect(() => {
    if(formData === "") return
      axios.get("https://weather-website-backend-0be487779640.herokuapp.com/getWeather/" + cityQuery).then((response) => {
      const tempDays = []
      console.log(response)
      for(let i = 0;i < response.data.dayArray.length;i++) {
        var date = new Date(response.data.dayArray[i]['date'])
        date.setDate(date.getDate() + 1)
        date = date.toLocaleDateString('en-US', { weekday: 'long' })
        const newDay = new Day(
          response.data.dayArray[i]['maxTempC'],
          response.data.dayArray[i]['minTempC'],
          response.data.dayArray[i]['maxTempF'],
          response.data.dayArray[i]['minTempF'],
          response.data.dayArray[i]['conditions'],
          response.data.dayArray[i]['icon'],
          date
        )
        tempDays.push(newDay)
      }
      setDays(tempDays)

      //Get & Set Location
      globalLocations[0] = response.data.name
      globalLocations[1] = response.data.region
      globalLocations[2] = response.data.country
      setLocation(globalLocations);

      //Update React to Re-Render page
      newQuery === 1 ? setQuery(2) : setQuery(1)
    });
  
  }, [formData]);

  const onFormSubmit = (event) => {
    setFormData(cityQuery);
    event.preventDefault();
  };

  const onFormChange = (event) => {
    cityQuery = event.target.value;
  };

  //Main Content
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
              <Col> <Button type="submit">Go</Button> </Col>
              <Col>
                <ButtonGroup>
                  {measurements.map((measurement, idx) => (
                    <ToggleButton
                      key={Math.random()}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={
                        (idx = 1 ? "outline-success" : "outline-danger")
                      }
                      name="radio"
                      value={measurement.value}
                      checked={isChecked === measurement.value}
                      onChange={(e) => {
                        setChecked(e.currentTarget.value);
                        changeMeasurement();
                      }}>
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
          {formData &&
          <div>
            <Row className="justify-content-center" xs="auto">
              <h1>{locations[0]}, {locations[1]}, {locations[2]}</h1>
            </Row>
            <Row className="justify-content-center">
              {days.map((day) => <WeatherCard day = {day}/>)}
            </Row>
          </div>
          }
        </Container>
        <Card.Footer className="custom-footer" style={{ backgroundColor: "grey" }}>
          <p>This website is a passion project and is not intended for detailed weather reports. Please direct any questions, comments, or concerns to ezramoss4@gmail.com</p>
        </Card.Footer>
      </body>
    </div>
  );
}

//Weather Card Component
function WeatherCard(props) {
  return (
    <Card className="mb-3" style={({ color: "black" }, { width: "20rem" })}>
      <br></br>
      <Card.Title className="text-center" style={{ fontSize: 45 }}>
        {props.day.date}
      </Card.Title>
      <div>
      <Image src={props.day.icon} style={{width: 50}, {height: 50}} rounded />
      </div>
      <Card.Body>
          <h3>{props.day.conditions}</h3>
          <h3>High: {globalMeasurement === 1 ? props.day.maxTempF :  props.day.maxTempC }</h3>
          <h3>Low: {globalMeasurement === 1 ? props.day.minTempF :  props.day.minTempC }</h3>
      </Card.Body>
    </Card>
  );
}

export default WeatherWebsite;