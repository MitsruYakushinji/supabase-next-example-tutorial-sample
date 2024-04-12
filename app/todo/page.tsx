import {Metadata} from 'next';

import TodoContents from './contents';

export const metadata: Metadata = {
  title: 'TODO | BASE',
};

export default async function Todo() {
  return (
    <div className={'card mx-16 mt-6 w-auto bg-base-100 p-6 shadow-xl'}>
      <h1 className={'mb-6 text-center text-4xl font-extrabold tracking-wider'}>
        TODO List
      </h1>
      <TodoContents></TodoContents>
    </div>
  );
}
