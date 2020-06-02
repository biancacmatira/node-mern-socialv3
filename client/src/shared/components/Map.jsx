import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(props =>
        <GoogleMap 
            defaultZoom={8}
            defaultCenter={{
                lat: props.coords.lat,
                lng: props.coords.lng
            }}
        >
            <Marker position={{
                lat: props.coords.lat,
                lng: props.coords.lng
            }}/>

        </GoogleMap>
    ));

export default Map;