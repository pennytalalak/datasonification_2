const url = "/v1/tp/";
const api_call = "trip";

const name_ori = "10111010"; //Central Station

//function to make parameters
export const trip = stopID_dest => {
  const data = {
    outputFormat: "rapidJSON", //response data type
    coordOutputFormat: "EPSG:4326",
    depArrMacro: "dep",
    type_origin: "coord",
    name_origin: "10111010", //Central Station
    type_destination: "coord",
    name_destination: stopID_dest,
    calcNumberOfTrips: 1,
    excludedMeans: "checkbox",
    exclMOT_4: "1",
    exclMOT_5: "1",
    exclMOT_7: "1",
    exclMOT_9: "1",
    exclMOT_11: "1",
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
