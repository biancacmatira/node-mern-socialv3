import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Modal from "react-modal";

import UsersList from "../components/UsersList";
// import { DUMMY_USERS } from "../../data";
import {
  CustomStylesSpinner,
  CustomStylesError,
} from "../../shared/components/CustomStyles";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState(null);

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users/");
        const resData = await res.json();

        if (!res.ok) {
          throw new Error(resData.message);
        }
        setLoadedUsers(resData.users);
      } catch (err) {
        setIsError(true);
        setError(err.message);
      }

      setIsLoading(false);
    };

    sendReq();
  }, []);

  const errorHandler = () => {
    setError(null);
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
          className="waves-effect wave-light btn-small deep-orange-text white right"
          onClick={errorHandler}
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
      <div className="container">
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      </div>
    </>
  );
};

export default Users;
