const url = "/v1/tp/";
// const coord_value = "150.892210:-33.962226:EPSG:4326"; //Central Station (LONG:LAT)
const api_call = "coord";

//function to make parameters
export const coordAPI = coord => {
  const data = {
    outputFormat: "rapidJSON", //response data type
    coordOutputFormat: "EPSG:4326", //format of the coordinates
    coord: coord,
    inclFilter: "1",
    type_1: "BUS_POINT",
    radius_1: 500, //meters
    PoisOnMapMacro: "true"
  };

  //methods for working with the query string of a URL (e.g. everything after "?").
  //This means no more string splitting URLs!
  const searchParams = new URLSearchParams(data);

  return fetch(url + api_call + "?" + searchParams.toString()).then(res =>
    res.json()
  );
};

export default coordAPI;
