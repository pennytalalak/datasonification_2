import React from "react";

//A stateless component
const TransportInfo = props => {
  return (
    <div>
      <p>Destination: {props.destination}</p>
      <p>Closest stop: </p>
      <p>Platform: </p>
      <p>Coming in: </p>
      {props.error && <p>{props.error}</p>}
    </div>
  );
};
export default TransportInfo;
