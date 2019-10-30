const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
    });
  } else {
    console.log("error");
  }
};

export default getGeoLocation;
