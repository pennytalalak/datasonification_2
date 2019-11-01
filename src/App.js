import React, { Component } from "react";
import { trip } from "./API/trip";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import moment from "moment";

//component
import SearchBar from "./components/SearchBar";
import TransportInfo from "./components/TransportInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null,
      location: null,
      platform: null,
      time: null,
      error: "",
      myCoord: null
    };
    this.getGeoLocation();
  }

  //method to get API for destination
  stopFinder = async e => {
    //prevent refresh
    e.preventDefault();

    //user input
    const destination = e.target.elements.destination.value;

    //api call
    const url = "/v1/tp/";
    const api_call = "stop_finder";
    const name = destination;
    const param = {
      outputFormat: "rapidJSON",
      type_sf: "stop",
      name_sf: name,
      coordOutputFormat: "EPSG:4326",
      TfNSWSF: "true"
    };
    const searchParams = new URLSearchParams(param);
    const data = await fetch(
      url + api_call + "?" + searchParams.toString()
    ).then(res =>
      res.json().then(data => {
        const stopID = data.locations[0].id;
        return trip(stopID, this.state.myCoord);
      })
    );

    //see the trip data API
    console.log(data);

    //change state
    if (destination) {
      // PENNY playing around with time here
      const time = data.journeys[0].legs[0].destination.arrivalTimeEstimated;
      let localTime = moment.parseZone(time);

      let now = moment();
      const timeEstimate = moment.duration(localTime.diff(now));
      console.log("Moment Time", timeEstimate.minutes());

      ///

      //pass the items that are being updated
      this.setState({
        destination: data.journeys[0].legs
          .slice(-1)[0] //get the last destination
          .destination.name.split(",")[1],
        location: data.journeys[0].legs[0].destination.name,
        platform: data.journeys[0].legs[1].destination.name.split(",")[2],
        time: timeEstimate.minutes()
      });
    } else {
      this.setState({
        error: "Please enter your destination"
      });
    }
  };

  //convert time function
  getTime = data => {};

  //count down
  countDown = () => {};

  //get Geolocation
  getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latlng = position.coords;
        console.log(latlng, "LATLONG");

        //set State
        this.setState({
          myCoord: `${latlng.longitude}: ${latlng.latitude}:EPSG:4326`
        });
      });
    } else {
      console.log("GeoLocation is not possible in this browser");
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 bg-container"></div>
                <div className="col-xs-7 form-container">
                  <SearchBar stopFinder={this.stopFinder} />
                  <TransportInfo
                    destination={this.state.destination}
                    location={this.state.location}
                    platform={this.state.platform}
                    time={this.state.time}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
