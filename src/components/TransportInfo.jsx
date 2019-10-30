import React from "react";

//A stateless component
const TransportInfo = props => {
  return (
    <div className="transport__info">
      <p className="transport__key">
        Destination:
        <span className="transport__value">{props.destination}</span>
      </p>
      <p className="transport__key">
        Closest stop:
        <span className="transport__value">
          {props.location &&
            `${props.location.latitude} , ${props.location.longitude}`}
        </span>
      </p>
      <p className="transport__key">
        Platform:
        <span className="transport__value"></span>
      </p>
      <p className="transport__key">Coming in: </p>
      {props.error && <p>{props.error}</p>}
    </div>
  );
};
export default TransportInfo;
