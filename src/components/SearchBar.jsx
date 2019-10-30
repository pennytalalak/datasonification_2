import React from "react";
import Title from "./Title";

const SearchBar = props => {
  return (
    <div>
      <Title />
      <form onSubmit={props.stopFinder}>
        <input type="text" name="destination" placeholder="Search stops" />
        <button>Get Timetable</button>
      </form>
    </div>
  );
};

export default SearchBar;
