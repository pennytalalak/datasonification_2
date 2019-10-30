import React, { Component } from "react";
import { departure_mon } from "./API/departure_mon";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//component
import SearchBar from "./components/SearchBar";
import TransportInfo from "./components/TransportInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: undefined,
      yourLocation: undefined,
      platform: undefined,
      time: undefined,
      error: ""
    };
  }

  //method to get API
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
      outputFormat: "rapidJSON", //response data type
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
        return departure_mon(stopID);
      })
    );
    console.log(data);

    //change state
    if (destination) {
      this.setState({
        destination: data.locations[0].name,
        yourLocation: undefined,
        platform: undefined,
        time: undefined,
        error: ""
      });
    } else {
      this.setState({
        error: "Please enter your destination"
      });
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
