import React, { Component } from "react";
import Title from "./Title";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <Title />

        <form onSubmit={this.props.stopFinder}>
          <input type="text" name="destination" placeholder="Search stops" />
          <button>Get Timetable</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
