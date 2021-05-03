import React from "react";
import credentials from "../credentials";
import {
  GoogleMap,
  useLoadScript,
  
} from "@react-google-maps/api";
import { unstable_concurrentAct } from "react-dom/test-utils";
//import {formatRelative} from "date-fns"
//import * as parksData from "../data/skateboard-parks.json";
//import "@reach/combobox/style.css";

const libraries = ["places"];
const mapContainerStyle = {
  with: "100vw",
  height: "100vh",
};
const center = {
  lat: 9.9348041,
  lng: -84.1020275,
};
const options= {
  disableDefaultUI:true,
  zoomControl: true
}


const Map = () => {
  //const [selectedPark, setSelectedPark] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: process.env.API_KEY_GOOGLE_MAPS,
    googleMapsApiKey:credentials.mapsKey,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  if (loadError) return "Error al cargar el mapa";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>Agricultores 🧑‍🌾</h1>
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options ={options}
      onClick = {(event)=>{
        setMarkers((current)=>[...current,{
          lat:event.latLng.lat(),
          lnh:event.latLng.lng(),
          time: new Date(),

        }])
      }}
    ></GoogleMap>
    </div>
    
  );
};
//<a href='https://www.freepik.es/vectores/diseno'>Vector de Diseño creado por macrovector - www.freepik.es</a>
export default Map;
