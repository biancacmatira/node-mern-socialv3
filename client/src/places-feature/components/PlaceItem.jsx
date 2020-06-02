import React from 'react';

const PlaceItem = (props) => {
    return (
        <div className="col s6 offset-s3">
            <div className="card">
                <div className="card-image">
                    <img src={props.imageUrl} alt="" />
                    <span className="card-title">
                        {props.title}
                    </span>
                </div>
                <div className="card-content">
                    <p>{props.description}</p>
                </div>
                <div className="card-action">
                    <div>
                        <i className="material-icons">location_on</i>
                        <span className="card-address">{props.address}</span>
                    </div>
                    <div className="card-options">
                        <i className="material-icons">mode_edit</i>
                        <i className="material-icons">delete</i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceItem;