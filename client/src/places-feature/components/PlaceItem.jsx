import React, {useState} from 'react';
import Modal from 'react-modal'

import Map from '../../shared/components/Map';

const customStyles  = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.75)"
    },
    content: {
        top:  "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "90%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

Modal.setAppElement('#modal-root');

const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <>
            <Modal 
                isOpen={showMap}
                onRequestClose={closeMapHandler}
                style={customStyles}
                contentLabel={props.title}
            >
                <Map coords={props.location} />
                <div className="modal-footer">
                    {props.address}
                    <button onClick={closeMapHandler}>close</button>
                </div>
            </Modal>

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
                            <i className="material-icons geoloc" onClick={openMapHandler} >location_on</i>
                            <span className="card-address" onClick={openMapHandler}>{props.address}</span>
                        </div>
                        <div className="card-options">
                            <i className="material-icons">mode_edit</i>
                            <i className="material-icons">delete</i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceItem;