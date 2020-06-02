import React, {useReducer} from 'react';
import {validate} from '../../util/validators';

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return{
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return{
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}


const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = 
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                className={`validate ${!inputState.isValid && inputState.isTouched && 'invalid'}`}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ): (
            <textarea
                id={props.id}
                rows={props.row || 3}
                className={`validate ${!inputState.isValid && inputState.isTouched && 'invalid'}`}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        )

    return (
        <div className="input-field col s6">
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
            <label className="white-text" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    );
};

export default Input;