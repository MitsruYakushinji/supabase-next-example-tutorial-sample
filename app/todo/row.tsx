'use client';

import {TrashIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {useState} from 'react';

import {TodoRowProps} from 'lib/features/todo/types';

import style from './style.module.css';

export default function TodoRow(props: TodoRowProps) {
  const [isCheck, setIsCheck] = useState<boolean>(props.isCheck);

  const handleCheck = () => {
    props.handleCheck && props.handleCheck();
    setIsCheck(!isCheck);
  };

  return (
    <tr
      className={clsx(
        'hover my-4 transition duration-200 ease-in-out',
        isCheck ? `${style.switch}` : 'inherit'
      )}
    >
      <td className="text-center">
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={props.isCheck}
          onChange={handleCheck}
        />
      </td>
      <td className={clsx(isCheck ? 'line-through' : '')}>{props.task}</td>
      <td>{props.createdAt}</td>
      <td>{props.checkedAt}</td>
      <td>
        <TrashIcon
          className="h-6, w-6 cursor-pointer"
          onClick={props.handleDelete}
        />
      </td>
    </tr>
  );
}
