const getGeoLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
    });
  } else {
    console.log("GeoLocation is not possible in this browser");
  }
};

export default getGeoLocation;
