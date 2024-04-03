'use client';

import {useSetRecoilState} from 'recoil';

import {createProjectModalState, modalState} from '../../lib/features/modal';

export default function NewProjectButton() {
  const setState = useSetRecoilState(modalState);
  const openAddNewLeadModal = () => {
    setState(createProjectModalState());
  };
  return (
    <button
      className="btn btn-primary btn-sm px-6 normal-case"
      onClick={openAddNewLeadModal}
    >
      Add New
    </button>
  );
}
