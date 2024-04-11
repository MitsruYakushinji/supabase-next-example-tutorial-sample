'use client';

import {Dispatch, SetStateAction} from 'react';

import {Todo} from 'lib/features/todo/types';

import TodoRow from './row';

export default function TodoList(props: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  getNow: () => string;
}) {
  const onClickDelete = (index: number) => {
    const newTodos = [...props.todos];
    newTodos.splice(index, 1);
    props.setTodos(newTodos);
  };

  const onChangeCheck = (index: number) => {
    const newTodos = [...props.todos];
    newTodos[index].isCheck = !newTodos[index].isCheck;
    newTodos[index].checkedAt = newTodos[index].isCheck ? props.getNow() : '';
    props.setTodos(newTodos);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-fixed">
        <thead>
          <tr>
            <th className="text-center">Check</th>
            <th className="w-1/2">Task</th>
            <th>Created At</th>
            <th>Checked At</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo, index) => (
            <TodoRow
              key={index}
              isCheck={todo.isCheck}
              task={todo.task}
              createdAt={todo.createdAt}
              checkedAt={todo.checkedAt}
              handleDelete={onClickDelete.bind(null, index)}
              handleCheck={onChangeCheck.bind(null, index)}
            ></TodoRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
