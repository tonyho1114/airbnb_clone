import React,{useState} from 'react'
import Map, { Popup , Marker }  from 'react-map-gl';
import { getCenter } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';

const MaponSearchPage = ({searchResults}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const coordinates = searchResults.map((result)=>({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates);

  const [viewPort, setViewPort] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom:11,
  })

  return (
    <div>
      
      <Map
        {...viewPort}
        mapStyle={process.env.NEXT_PUBLIC_MAP_STYLE}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ height: "100vh", width: "600px" }}
        onMove={(evt) => setViewPort(evt.viewState)}
        onClick={() => setSelectedLocation(null)}
      >
        {searchResults.map((result, index) => (
          <Marker
            longitude={result.long}
            latitude={result.lat}
            style={{ position: "absolute" }}
            key={index}
          >
            <p
              role="img"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLocation({ lat: result.lat, long: result.long, title: result.title });
              }}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>
        ))}
        {selectedLocation && (
          <Popup
            anchor="top"
            longitude={selectedLocation.long}
            latitude={selectedLocation.lat}
            closeOnClick={false}
            closeButton={false}
            closeOnMove={false}
          >
            {selectedLocation.title}
          </Popup>
        )}
      </Map>
    </div>
  )
}

export default MaponSearchPage

