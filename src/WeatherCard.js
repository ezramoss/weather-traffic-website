import { Card, Image} from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <h3>High: {props.measurement === 1 ? props.day.maxTempF :  props.day.maxTempC }</h3>
            <h3>Low: {props.measurement === 1 ? props.day.minTempF :  props.day.minTempC }</h3>
        </Card.Body>
      </Card>
    );
}

export default WeatherCard