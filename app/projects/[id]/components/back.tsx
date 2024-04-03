'use client';

import {useRouter} from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const onClick = () => {
    router.push('/projects');
  };

  return (
    <button
      className="btn btn-neutral btn-sm px-6 normal-case"
      onClick={onClick}
    >
      Back
    </button>
  );
}
