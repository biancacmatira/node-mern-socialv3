import React from "react";

import Input from "../../shared/components/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../shared/hooks/FormHooks";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //goes to backend
  };

  return (
    <div className="row center">
      <form className="col s6 offset-s3" onSubmit={placeSubmitHandler}>
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="description"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="address"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <button type="submit" disabled={!formState.isValid}>
          Add Place
        </button>
      </form>
    </div>
  );
};

export default NewPlace;
