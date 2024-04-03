'use client';

import {useResetRecoilState, useSetRecoilState} from 'recoil';

import {
  modalState,
  projectRegisterComponentModalState,
} from 'lib/features/modal';

export default function AddButton({projectId}: {projectId: string}) {
  const setState = useSetRecoilState(modalState);
  const setClose = useResetRecoilState(modalState);
  const onClick = () => {
    setState(
      projectRegisterComponentModalState({
        projectId,
        completed: setClose,
      })
    );
  };

  return (
    <button
      className="btn btn-primary btn-sm ml-2 px-6 normal-case"
      onClick={onClick}
    >
      Add
    </button>
  );
}
