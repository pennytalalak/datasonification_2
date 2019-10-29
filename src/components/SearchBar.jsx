import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <form onSubmit={this.props.stopFinder}>
        <input type="text" name="destination" placeholder="Search stops" />
        <button>Get Timetable</button>
      </form>
    );
  }
}

export default SearchBar;
