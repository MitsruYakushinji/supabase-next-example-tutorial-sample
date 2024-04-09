import {Metadata} from 'next';

import TodoForm from './form';
import TodoList from './list';

export const metadata: Metadata = {
  title: 'TODO | BASE',
};

export default async function Todo() {
  return (
    <div>
      <h1>TODO Page</h1>
      <TodoForm></TodoForm>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <TodoList></TodoList>
      </table>
    </div>
  );
}
