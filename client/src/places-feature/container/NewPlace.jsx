import React from 'react';

import Input from '../../shared/components/Input';
import {VALIDATOR_REQUIRE} from '../../util/validators';

const NewPlace = () => {
  return(
    <div className="row center">
      <form className="col s12 offset-s3">
        <Input 
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
        />
      </form>
    </div>
  )
};

export default NewPlace;