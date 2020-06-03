import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

import Map from "../../shared/components/Map";

const customStylesA = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "90%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const customStylesB = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#modal-root");

const PlaceItem = (props) => {
  const history = useHistory();
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteHandler = () => setShowConfirm(true);
  const closeDeleteHandler = () => setShowConfirm(false);

  const editHandler = (id) => {
    history.push(`/places/${id}`);
  };

  const confirmDeleteHandler = () => {
    console.log("DELETED");
    setShowConfirm(false);
  };

  return (
    <>
      <Modal
        isOpen={showMap}
        onRequestClose={closeMapHandler}
        style={customStylesA}
        contentLabel={props.title}
      >
        <Map coords={props.location} />
        <div className="modal-footer">
          {props.address}
          <button onClick={closeMapHandler}>close</button>
        </div>
      </Modal>
      <Modal
        isOpen={showConfirm}
        onRequestClose={closeDeleteHandler}
        style={customStylesB}
        contentLabel="Delete a place warning"
      >
        <div className="modal-header">Are you sure?</div>
        <div className="modal-content">
          You are about to delete a place. Are you sure you want to that?
        </div>
        <div className="modal-footer">
          <button onClick={closeDeleteHandler}>Cancel</button>
          <button onClick={confirmDeleteHandler}>Delete</button>
        </div>
      </Modal>

      <div className="col s6 offset-s3">
        <div className="card">
          <div className="card-image">
            <img src={props.imageUrl} alt="" />
            <span className="card-title">{props.title}</span>
          </div>
          <div className="card-content">
            <p>{props.description}</p>
          </div>
          <div className="card-action">
            <div>
              <i className="material-icons clickable" onClick={openMapHandler}>
                location_on
              </i>
              <span className="card-address" onClick={openMapHandler}>
                {props.address}
              </span>
            </div>
            <div className="card-options">
              <i
                className="material-icons clickable"
                onClick={() => editHandler(props.id)}
              >
                mode_edit
              </i>
              <i
                className="material-icons clickable"
                onClick={openDeleteHandler}
              >
                delete
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceItem;
