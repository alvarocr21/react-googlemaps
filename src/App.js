import React from "react";
import Map from "./components/Mapa";
import credentials from "./credentials";

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${credentials.mapsKey}`;

function App() {
  return (
    <Map
      googleMapURL={mapURL}
      containerElement={<div style={{ height: "100vh" }} />}
      mapElement={<div style={{ height: "100%" }} />}
      loadingElement={<div style={{ height: "100%" }} />}
    />
  );
}

export default App;
