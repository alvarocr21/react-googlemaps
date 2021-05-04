import React, { useState } from "react";
import credentials from "../credentials";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
//import * as parksData from "../data/skateboard-parks.json";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  with: "100vw",
  height: "100vh",
};
const center = {
  lat: 9.9348041,
  lng: -84.1020275,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
 
  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAPS,
    googleMapsApiKey: credentials.mapsKey,
    libraries,
  });
  
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map)=>{
    mapRef.current = map;
  },[]);

  const panTo = React.useCallback(({lat,lng})=>{
    console.log(mapRef)
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(14);
  },[])

  if (loadError) return "Error al cargar el mapa";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>Agricultores 🧑‍🌾</h1>

      <Search panTo={panTo}/>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/harvest.png",
              scaledSize: new window.google.maps.Size(40, 60),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 30),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <h2>Detalles</h2>
              <p>Hora {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestion,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 9.9348041, lng: () => -84.1020275 },
      radius: 50 * 1000,
    },
  });
  return (
    <div className="search">
       <Combobox onSelect={async (address)=>{
         try{
          const results = await getGeocode ({address});
          const {lat, lng} = await getLatLng(results[0]);
          panTo({lat,lng});
         }catch(error)
         {
           console.log("error")
         }
    console.log(address);
  }}>
    <ComboboxInput value={value} onChange={(e)=>{
      setValue(e.target.value);
    }}
    disabled={!ready}
    placeholder = "Ingrese una ubicación"
    />
    <ComboboxPopover>
      {status==="OK" && data.map(({id,description})=>(
        <ComboboxOption key={id} value={description}/>
      ))}
    </ComboboxPopover>
  </Combobox>
    </div>
   
  );
  
}
//<a href='https://www.freepik.es/vectores/diseno'>Vector de Diseño creado por macrovector - www.freepik.es</a>
export default Map;
