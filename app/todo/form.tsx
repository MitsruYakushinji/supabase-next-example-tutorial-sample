'use client';

import {Dispatch, SetStateAction} from 'react';

import {Todo} from 'lib/features/todo/types';

import Button from './button';
import InputTextField from './input';

export default function TodoForm(props: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  getNow: () => string;
}) {
  const maxLength = 30;

  // フォームのsubmitイベントをハンドリングする関数
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const newTask = input.value;
    if (newTask === '' || newTask.length > maxLength) {
      return;
    }
    const newTodos = [
      ...props.todos,
      {
        task: newTask,
        isCheck: false,
        createdAt: props.getNow(),
        checkedAt: '',
      },
    ];
    props.setTodos(newTodos);

    input.value = '';
  };

  return (
    <form className="form px-24" onSubmit={handleOnSubmit}>
      <div className="form-control flex-row">
        <InputTextField
          placeholder="Add new Task..."
          errorMessage={`${maxLength}文字以内で入力して下さい`}
          maxLength={maxLength}
        />
        <Button field="Add" />
      </div>
    </form>
  );
}
