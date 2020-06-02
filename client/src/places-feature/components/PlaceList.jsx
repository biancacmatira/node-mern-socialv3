import React from 'react';
import PlaceItem from './PlaceItem';

const PlaceList = (props) => {

    if(props.places.length === 0){
        return(
            <div className="row center">
                <h4>No Places found. Maybe create one?</h4>
                <a href="#!" className="btn-floating btn-large"><i className="material-icons black">add</i></a>
            </div>
        )
    }

    return (
        <div className="row center">
            {props.places.map(place => (
                <PlaceItem key={place.id} {...place} />
            ))}
        </div>
    );
};

export default PlaceList;