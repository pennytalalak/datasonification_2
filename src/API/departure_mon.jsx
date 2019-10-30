const url = "/v1/tp/";
const api_call = "departure_mon";

//function to make parameters
export const departure_mon = stopID => {
  const data = {
    outputFormat: "rapidJSON", //response data type
    coordOutputFormat: "EPSG:4326", //format of the coordinates
    mode: "direct",
    type_dm: "platform", //type of results
    name_dm: stopID,
    departureMonitorMacro: "true",
    excludedMeans: "checkbox",
    exclMOT_1: "",
    exclMOT_4: "",
    exlMOT_5: "1",
    exclMOT_7: "",
    exclMOT_9: "",
    exclMOT_11: "",
    TfNSWDM: "true"
  };

  //methods for working with the query string of a URL (e.g. everything after "?").
  //This means no more string splitting URLs!
  const searchParams = new URLSearchParams(data);

  return fetch(url + api_call + "?" + searchParams.toString()).then(res =>
    res.json()
  );
};

export default departure_mon;
