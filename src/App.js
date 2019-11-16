import React, { Component } from "react";
import { trip } from "./API/trip";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import moment from "moment";

//component
import SearchBar from "./components/SearchBar";
import TransportInfo from "./components/TransportInfo";
import TrainAudio from "./components/Sound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null,
      location: null,
      platfrm: null,
      time: null,
      countdown: 0,
      countdownInterval: null,
      arrived: false,
      error: "",
      myCoord: null,
      playAudio: false,
      volumeAudio: 0
    };
    this.getGeoLocation();
  }

  //method to get API for destination
  stopFinder = async e => {
    // console.log("lalla");

    // if (this.state.destination) {
    //   //if destination is undefined
    //   return;
    // }

    //prevent refresh
    e.preventDefault();
    clearInterval(this.state.countdownInterval);

    //input
    const destination = e.target.elements.destination.value;
    const { myCoord } = this.state;

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
        if (!data || data.locations.length === 0) {
          return data;
        }

        const stopID = data.locations[0].id;
        return trip(stopID, myCoord);
      })
    );

    //see the trip data API
    console.log(data);

    //change state when there's destination
    if (destination && data && data.journeys) {
      // get time
      const time = data.journeys[0].legs[0].destination.arrivalTimeEstimated;
      let localTime = moment.parseZone(time); //convert time

      let now = moment(); //current time
      const timeEstimate = parseInt(localTime.diff(now) / 1000, 10); //time left till train

      //pass the items that are being updated
      this.setState({
        destination: data.journeys[0].legs
          .slice(-1)[0] //get the last destination
          .destination.name.split(",")[1],
        location: data.journeys[0].legs[0].destination.name,
        platform: data.journeys[0].legs
          .slice(-1)[0]
          .destination.name.split(",")[2],
        countdown: timeEstimate,
        error: ""
      });

      //starting the countdown
      var countdownInterval = setInterval(() => {
        const { countdown } = this.state; //this.state.countdown

        let newCountdown = countdown - 1; //countdown is in seconds

        // UPDATE STATE
        this.setState({
          countdown: newCountdown
        });

        const volumeTime = 480; //5 mins

        if (newCountdown < 0) {
          clearInterval(countdownInterval);
          this.setState({ arrived: true });
        } else if (newCountdown < volumeTime) {
          const xNumber = 100 / volumeTime; //xNumber = factor
          const volume = (volumeTime - newCountdown) * xNumber;

          this.setState({ playAudio: true, volumeAudio: volume });
        }
      }, 1000); //end setInterval function
      this.setState({ countdownInterval });
    } else {
      let errorMessage = "Please enter your destination";

      if (destination) {
        if (data && data.locations.length === 0) {
          errorMessage = "No location found";
        } else if (!data || !data.journeys || data.journeys.length === 0) {
          errorMessage = "API Error";
        }
      }

      this.setState({
        error: errorMessage
      });
    }
  };

  //get Geolocation
  getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latlng = position.coords;

        //set State
        this.setState({
          myCoord: `${latlng.longitude}: ${latlng.latitude}:EPSG:4326`
        });
      });
    } else {
      console.log("GeoLocation is not possible in this browser");
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.countdownInterval);
  }

  render() {
    const { countdown, arrived, playAudio, volumeAudio } = this.state;
    let countdownText = "";
    if (arrived) {
      countdownText = "ARRIVED";
    } else if (countdown > 0) {
      let minutes = parseInt(countdown / 60, 10);
      let seconds = countdown % (minutes * 60);

      countdownText = `${minutes} mins, ${seconds} secs`;
    }
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
                    countdown={countdownText}
                    error={this.state.error}
                  />
                  <TrainAudio play={playAudio} volumeAudio={volumeAudio} />
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
