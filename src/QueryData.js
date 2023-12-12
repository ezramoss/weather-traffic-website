import axios from "axios";
import Day from "./Day.js";

function QueryData(cityQuery) {
  console.log("cityQuery: " + cityQuery);
  let tempDays = new Array(3);
  let locationData = [];
  if (cityQuery === "") return { tempDays, locationData };
  //return axios.get("https://weather-website-backend-0be487779640.herokuapp.com/getWeather/" + cityQuery).then((response) => {
  return axios
    .get("http://localhost:5000/getWeather/" + cityQuery)
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.dayArray.length; i++) {
        var date = new Date(response.data.dayArray[i]["date"]);
        date.setDate(date.getDate() + 1);
        date = date.toLocaleDateString("en-US", { weekday: "long" });
        const newDay = new Day(
          response.data.dayArray[i]["maxTempC"],
          response.data.dayArray[i]["minTempC"],
          response.data.dayArray[i]["maxTempF"],
          response.data.dayArray[i]["minTempF"],
          response.data.dayArray[i]["conditions"],
          response.data.dayArray[i]["icon"],
          date
        );
        tempDays[i] = newDay;
      }
      //Get & Set Location
      locationData[0] = response.data.name;
      locationData[1] = response.data.region;
      locationData[2] = response.data.country;

      var lat = response.data.lat;
      var lon = response.data.lon;
      return { tempDays, locationData, lat, lon };
    });
}
export default QueryData;
