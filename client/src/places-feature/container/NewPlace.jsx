import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";
import Modal from "react-modal";
import { useSelector } from "react-redux";

import CustomTextInput from "../../shared/components/CustomTextInput";

import {
  CustomStylesSpinner,
  CustomStylesError,
} from "../../shared/components/CustomStyles";
import { useHttpClient } from "../../shared/hooks/HttpHook";

const NewPlace = () => {
  const [isError, setIsError] = useState(false);
  const { isLoading, error, sendReq, clearError } = useHttpClient();
  const { userId } = useSelector((state) => state);
  const history = useHistory();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("A title is required"),
    description: Yup.string().required("A description is required"),
    address: Yup.string().required("An address is required"),
  });

  const placeSubmitHandler = async (values) => {
    try {
      await sendReq(
        "http://localhost:5000/api/places/",
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify({
          title: values.title,
          description: values.description,
          address: values.address,
          creator: values.creator,
        })
      );
      // redirect
      history.push("/");
    } catch (err) {
      setIsError(true);
    }
  };

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
        <Formik
          initialValues={{
            title: "",
            description: "",
            address: "",
            creator: userId,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm, submitForm }) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
            submitForm();
            placeSubmitHandler(values);
            // }, 1000);
          }}
        >
          {(props) => {
            return (
              <div className="row">
                <div className="col s6 offset-s3">
                  <Form>
                    <h1>Create a Place</h1>
                    <CustomTextInput label="Title" name="title" type="text" />
                    <CustomTextInput
                      label="Description"
                      name="description"
                      type="textarea"
                    />
                    <CustomTextInput
                      label="Address"
                      name="address"
                      type="text"
                    />
                    <button
                      className="waves-effect waves-light btn white-text green darken-4"
                      type="submit"
                      disabled={!!props.isSubmitting}
                    >
                      {props.isSubmitting ? "Loading..." : "Submit"}
                      <i className="material-icons right">send</i>
                    </button>
                  </Form>
                </div>
                {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default NewPlace;
