'use client';

import {useResetRecoilState, useSetRecoilState} from 'recoil';

import {
  modalState,
  templateRegisterComponentModalState,
} from 'lib/features/modal';

export default function AddButton({templateId}: {templateId: string}) {
  const setState = useSetRecoilState(modalState);
  const setClose = useResetRecoilState(modalState);
  const onClick = () => {
    setState(
      templateRegisterComponentModalState({
        templateId,
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
