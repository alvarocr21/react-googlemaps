import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as parksData from "../data/skateboard-parks.json";

const Map = () => {
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 9.9348041, lng: -84.1020275 }}
    >
      {parksData.features.map((park) => (
        //Aqui definimos el marker para cada vendedor
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0],
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url:'/harvest.png',
            scaledSize: new window.google.maps.Size(50,65)
          }}
        />
      ))}
      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0],
          }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
//<a href='https://www.freepik.es/vectores/diseno'>Vector de Diseño creado por macrovector - www.freepik.es</a>
export default withScriptjs(withGoogleMap(Map));
