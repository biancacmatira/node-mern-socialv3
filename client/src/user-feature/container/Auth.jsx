import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CustomTextInput from '../../shared/components/CustomTextInput';

const Auth = () => {

    return(
        <>
            <Formik
                initialValues={}
                validationSchema={}
                onSubmit={}
            >
                {(props)=>{
                    return(
                        <>
                            <Form>
                                <h1>Sign In</h1>
                                <CustomTextInput 
                                    label="Username"
                                    name="username"
                                    type="text"
                                />
                                <CustomTextInput 
                                    label="Password"
                                    name="password"
                                    type="password"
                                />

                                <button type="submit">
                                    Submit
                                </button>
                            </Form>
                        </>
                    )
                }}

            </Formik>
        </>
    )

};

export default Auth;