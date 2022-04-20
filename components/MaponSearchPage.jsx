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
      mapStyle={process.env.NEXT_PUBLIC_MAP_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...viewPort}
      style={{height: '100vh', width: '600px'}}
      onMove={evt => setViewPort(evt.viewState)}
    >
      {searchResults.map(result=>(   
        <div key={result.long}>   
          {console.log(`long-search: ${result.long} lat-search:${result.lat}`)}
          <Marker            
            longitude={result.long}
            latitude={result.lat}
            style={{position:'absolute'}}
            // offsetLeft={-20}
            // offsetTop={-10}
          >
            <p 
              role='img'
              onClick={() => {if(result.lat !== undefined && result.long!==undefined){setSelectedLocation({lat: result.lat, long: result.long, title: result.title})}}}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
            >
              📍
            </p>
          </Marker>     
          { selectedLocation?.long===result.long && (
          <Popup
            anchor="top"      
            longitude={Number(selectedLocation.long)}
            latitude={Number(selectedLocation.lat)}
            closeOnClick={false}
            // onClose={() => setSelectedLocation(null)}
            closeButton={true}
          >
            <div>
              {console.log(`long-select: ${selectedLocation.long} lat-select:${selectedLocation.lat}`)}
              {/* {'It Worked'} */}
              {selectedLocation.title}
            </div>
          </Popup>
          )}
        </div>          
      ))}




    </Map>
    </div>
  )
}

export default MaponSearchPage

