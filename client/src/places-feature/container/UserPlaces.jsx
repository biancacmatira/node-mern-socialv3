import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import Loader from "react-loader-spinner";
import Modal from "react-modal";
import {
  CustomStylesSpinner,
  CustomStylesError,
} from "../../shared/components/CustomStyles";
import { useHttpClient } from "../../shared/hooks/HttpHook";

// import { DUMMY_PLACES } from "../../data";

const UserPlaces = () => {
  const userId = useParams().uid;
  // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === +userId);

  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [error, setError] = useState(null);
  const [loadedPlaces, setLoadedPlaces] = useState(null);
  const { isLoading, error, sendReq, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      //   setIsLoading(true);
      try {
        const res = await sendReq(
          `http://localhost:5000/api/places/user/${userId}`
        );
        // const resData = await res.json();

        // if (!res.ok) {
        //   throw new Error(resData.message);
        // }

        setLoadedPlaces(res.places);
      } catch (err) {
        setIsError(true);
        // setError(err.message);
      }
      // setIsLoading(false);
    };
    fetchPlaces();
  }, [sendReq, userId]);

  const errorHandler = () => {
    clearError();
    setIsError(false);
  };

  return (
    <>
      <Modal
        isOpen={isError}
        style={CustomStylesError}
        onRequestClose={errorHandler}
      >
        <div className="modal-header">
          <h3>An error occurred:</h3>
        </div>
        <div className="modal-content">{error}</div>
        <button
          onClick={errorHandler}
          className="waves-effect wave-light btn-small deep-orange-text white right"
        >
          Close
        </button>
      </Modal>
      <Modal isOpen={isLoading} style={CustomStylesSpinner}>
        <Loader
          type="Circles"
          color="#FFF"
          height={200}
          width={200}
          timeout={0}
          visible={isLoading}
        />
      </Modal>
      <div>
        {!isLoading && loadedPlaces && <PlaceList placesList={loadedPlaces} />}
      </div>
    </>
  );
};

export default UserPlaces;
