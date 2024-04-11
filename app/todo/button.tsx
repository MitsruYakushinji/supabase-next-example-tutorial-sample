'use client';

import clsx from 'clsx';

import {ButtonProps} from 'lib/features/todo/types';

export default function Button(props: ButtonProps) {
  return (
    <button
      className={clsx('btn btn-primary', props.size && `btn-${props.size}`)}
    >
      {props.field}
    </button>
  );
}
