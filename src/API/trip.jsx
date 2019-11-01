const url = "/v1/tp/";
const api_call = "trip";

// const myCoord = "151.208351:-33.867357:EPSG:4326";

//function to make parameters
export const trip = (stopID, myCoord) => {
  const data = {
    outputFormat: "rapidJSON",
    coordOutputFormat: "EPSG:4326",
    depArrMacro: "dep",
    type_origin: "coord",
    name_origin: myCoord,
    type_destination: "any",
    name_destination: stopID,
    calcNumberOfTrips: 1,
    TfNSWSF: "true"
  };

  //methods for working with the query string of a URL (e.g. everything after "?").
  //This means no more string splitting URLs!
  const searchParams = new URLSearchParams(data);

  return fetch(url + api_call + "?" + searchParams.toString()).then(res =>
    res.json()
  );
};

export default trip;
