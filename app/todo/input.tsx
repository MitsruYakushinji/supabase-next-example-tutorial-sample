'use client';

import clsx from 'clsx';
import {useState} from 'react';

import {InputTextFieldProps} from 'lib/features/todo/types';

import style from './style.module.css';

export default function InputTextField(props: InputTextFieldProps) {
  const [isValid, setIsValid] = useState(true);

  const inputValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.maxLength && event.target.value.length > props.maxLength) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className="mr-2 w-full">
      <input
        type="text"
        placeholder={props.placeholder}
        className={clsx(`input input-bordered w-full ${style.switch}`)}
        onChange={inputValidation}
      />

      {props.errorMessage && !isValid && (
        <label className="label">
          <span className="label-text-alt text-error">
            {props.errorMessage}
          </span>
        </label>
      )}
    </div>
  );
}
