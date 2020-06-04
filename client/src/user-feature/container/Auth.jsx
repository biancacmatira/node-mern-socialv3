import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CustomTextInput from '../../shared/components/CustomTextInput';

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);


    const switchModeHandler = () => {
        setIsLoginMode((prevMode) => !prevMode);
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email().concat(!isLoginMode? Yup.string().required('Yuyup') : null),
        password: Yup.string().required('Yo, no password?')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,' 8 chara, 1 upper, 1 lower, 1 special char'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null])
            .concat(!isLoginMode? Yup.string().required('Yuyup') : null)
    })

    return(
        <>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
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
                                <h1>{isLoginMode ? "Sign In" : "Sign Up"}</h1>
                                <CustomTextInput 
                                    label="Username"
                                    name="username"
                                    type="text"
                                />
                                {!isLoginMode && <CustomTextInput label="Email" name="email" type="text" />}
                                <CustomTextInput 
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
                                {!isLoginMode && <CustomTextInput label="Confirm Password" name="confirmPassword" type="password" />}

                                <button type="submit">
                                    Submit
                                </button>
                            </Form>
                            <button onClick={()=>{switchModeHandler(); props.resetForm();}}>
                                Switch to {isLoginMode ? "Signup" : "Sign In"}
                            </button>
                        </>
                    )
                }}

            </Formik>
        </>
    )

};

export default Auth;