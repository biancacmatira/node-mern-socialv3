import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CustomTextInput from '../../shared/components/CustomTextInput';

const Auth = () => {

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Yo, no password?')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,' 8 chara, 1 upper, 1 lower, 1 special char')
    })

    return(
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(value, { setSubmitting, resetForm })=>{
                    //do api call for login/signup
                    resetForm();
                    setSubmitting(false);
                }}
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