'use client';

import {useState} from 'react';

import {Todo} from 'lib/features/todo/types';

import TodoForm from './form';
import TodoList from './list';

export default function TodoContents() {
  // todoの状態管理をTopレベルで行う為に定義
  const [todos, setTodos] = useState<Todo[]>([]);

  const getNowDatetime = () => {
    // formatを2022-01-01 12:00に変更してreturnする
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('ja-JP', options).format(new Date());
  };

  return (
    <>
      <TodoForm
        todos={todos}
        setTodos={setTodos}
        getNow={getNowDatetime}
      ></TodoForm>
      <div className="divider mt-2"></div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        getNow={getNowDatetime}
      ></TodoList>
    </>
  );
}
