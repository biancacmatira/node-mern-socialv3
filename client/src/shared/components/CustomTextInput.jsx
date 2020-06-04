import React from 'react';
import { useField } from "formik";
import TextareaAutosize from "react-textarea-autosize";

const CustomTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
  
    if (props.type === "text") {
      return (
        <div className="input-field col s12">
          <input {...field} {...props} />
          <label className="white-text active" htmlFor={props.id || props.name}>
            {label}
          </label>
          {meta.touched && meta.error ? (
            <span className="helper-text" data-error={meta.error}>
              {meta.error}
            </span>
          ) : null}
        </div>
      );
    } else if (props.type === "password") {
      return (
        <div className="input-field col s12">
          <input {...field} {...props} />
          <label className="white-text active" htmlFor={props.id || props.name}>
            {label}
          </label>
          {meta.touched && meta.error ? (
            <span className="helper-text" data-error={meta.error}>
              {meta.error}
            </span>
          ) : null}
        </div>
      );
    }
    return (
      <div className="input-field col s12">
        <TextareaAutosize
          className="materialize-textarea"
          {...field}
          {...props}
        />
        <label className="white-text active" htmlFor={props.id || props.name}>
          {label}
        </label>
        {meta.touched && meta.error ? (
          <span className="helper-text" data-error={meta.error}>
            {meta.error}
          </span>
        ) : null}
      </div>
    );
  };

  export default CustomTextInput;