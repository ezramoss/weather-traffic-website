import "./App.css";
import { Button, Card, Form, Row, Col, Container, ButtonGroup, ToggleButton, Image,} from "react-bootstrap";
import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

var globalCurrentMeasurement = 1
var tempsF = new Array(6);
var tempsC = new Array(6);
var globalDates = new Array(3)
var globalIcons = new Array(3)
var globalLocations = new Array(3)
var tempCondtions = new Array(3)

function App() {
  var currentMeasurement = globalCurrentMeasurement 
  var cityQuery = "";
  const [temps, setTempsData] = useState([]);
  const [conditions, setConditions] = useState([])
  const [formData, setFormData] = useState();
  const [dates, setDates] = useState([])
  const [icons, setIcons] = useState([])
  const [locations, setLocation] = useState([])
  const [newQuery, setQuery] = useState(1)
  const [isChecked, setChecked] = useState("1");
  const measurements = [
    { name: "°F", value: "1" },
    { name: "°C", value: "2" },
  ];

  //Change Between Celsius and Fahrenheit
  function changeMeasurement() {
    if (currentMeasurement === 1) {
      setTempsData(tempsC);
      currentMeasurement = 2;
    } else {
      setTempsData(tempsF);
      currentMeasurement = 1;
    }
    globalCurrentMeasurement = currentMeasurement
  }

  //Query Backend & Populate Temp/Condition Arrays with Location Result
  const onFormSubmit = (event) => {
    axios.get("https://weather-website-backend-0be487779640.herokuapp.com/getWeather/" + cityQuery).then((response) => {
      
      console.log(response)
      var tempCount = 0
      for(let i = 0;i < response.data.dayArray.length;i++) {
        tempsC[tempCount] = response.data.dayArray[i]['maxTempC']
        tempsC[tempCount+1] = response.data.dayArray[i]['minTempC']
        tempsF[tempCount] = response.data.dayArray[i]['maxTempF']
        tempsF[tempCount+1] = response.data.dayArray[i]['minTempF']
        tempCondtions[i] = response.data.dayArray[i]['conditions']
        globalIcons[i] = response.data.dayArray[i]['icon']
        var date = new Date(response.data.dayArray[i]['date'])
        date.setDate(date.getDate() + 1)
        globalDates[i] = date.toLocaleDateString('en-US', { weekday: 'long' })
        tempCount +=2
      }

      //Get Location
      globalLocations[0] = response.data.name
      globalLocations[1] = response.data.region
      globalLocations[2] = response.data.country

      //Set Temp based on current unit of measurement
      currentMeasurement === 1 ? setTempsData(tempsF) : setTempsData(tempsC)

      //Update React to Re-Render page
      newQuery === 1 ? setQuery(2) : setQuery(1)

      //Set Date, Location, Icon, and Conditions
      setDates(globalDates);
      setLocation(globalLocations);
      setIcons(globalIcons);
      setConditions(tempCondtions)
      
      globalCurrentMeasurement = currentMeasurement  
    });
    
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
          <div className="mt-3">
            <Container>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <h1 className="text">Find Your Weather</h1>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="mt-3">
            <Container>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    onChange={onFormChange}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Go</Button>
                </Col>
                <Col xs="auto">
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
                        }}
                      >
                        {measurement.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </Form>

        {/* Weather Cards */}

        <div className="mt-5">
          <Container>
            {formData &&
            <div>
              <Row className="justify-content-center">
              <Col xs="auto">
                <h1>{locations[0]}, {locations[1]}, {locations[2]}</h1>
              </Col>
              </Row>
              <Row className="justify-content-center">
              <WeatherCard
                dayName={dates[0]}
                city={formData}
                conditions={conditions[0]}
                icon = {icons[0]}
                tempMax={temps[0]}
                tempMin={temps[1]}
              />
              <WeatherCard
                dayName={dates[1]}
                city={formData}
                conditions={conditions[1]}
                icon = {icons[1]}
                tempMax={temps[2]}
                tempMin={temps[3]}
              />
              <WeatherCard
                dayName={dates[2]}
                city={formData}
                conditions={conditions[2]}
                icon = {icons[2]}
                tempMax={temps[4]}
                tempMin={temps[5]}
              />
            </Row>
            </div>
            }
          </Container>
        </div>
        <Card.Footer
          className="custom-footer"
          style={{ backgroundColor: "grey" }}
        >
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
        {props.dayName}
      </Card.Title>
      <div>
      <Image src={props.icon} style={{width: 50}, {height: 50}} rounded />
      </div>
      <Card.Body>
        <div>
          <h3>{props.conditions}</h3>
          <h3>High: {props.tempMax}</h3>
          <h3>Low: {props.tempMin}</h3>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;