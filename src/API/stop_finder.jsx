const url = "/v1/tp/";
const api_call = "stop_finder";
const name = "Cabramatta";

//Functoinal Component
const stopFinder = () => {
  const data = {
    outputFormat: "rapidJSON", //response data type
    type_sf: "stop",
    name_sf: name,
    coordOutputFormat: "EPSG:4326",
    TfNSWSF: "true"
  };

  //methods for working with the query string of a URL (e.g. everything after "?").
  //This means no more string splitting URLs!
  const searchParams = new URLSearchParams(data);

  return fetch(url + api_call + "?" + searchParams.toString()).then(res =>
    res.json()
  );
};

export default stopFinder;
