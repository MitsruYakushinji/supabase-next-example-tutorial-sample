'use client';

import {useRecoilState} from 'recoil';

import {
  MODAL_BODY_TYPES,
  closeModalState,
  modalState,
} from '../../../lib/features/modal';
import Confirm from './confirm';
import {ProjectRegisterComponent} from './project';
import {CreateTag} from './tag';
import {TemplateRegisterComponent} from './template';

export default function Modal() {
  const [state, setState] = useRecoilState(modalState);

  const close = () => {
    setState(closeModalState());
  };

  return (
    <>
      {/* The button to open modal */}
      <div className={`modal ${state.isOpen ? 'modal-open' : ''}`}>
        <div className={`modal-box  ${state.size === 'lg' ? 'max-w-5xl' : ''}`}>
          <button
            className="btn btn-circle btn-sm absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
          <h3 className="pb-6 text-center text-2xl font-semibold">
            {state.title}
          </h3>

          {/* Loading modal body according to different modal type */}

          {state.type === MODAL_BODY_TYPES.CLOSE && <div></div>}
          {state.type === MODAL_BODY_TYPES.CREATE_PROJECT && <div></div>}
          {state.type === MODAL_BODY_TYPES.CREATE_TAG && (
            <CreateTag close={close} />
          )}
          {state.type === MODAL_BODY_TYPES.PROJECT_REGISTER_COMPONENT && (
            <ProjectRegisterComponent {...{...state.extra}} />
          )}
          {state.type === MODAL_BODY_TYPES.TEMPLATE_REGISTER_COMPONENT && (
            <TemplateRegisterComponent {...{...state.extra}} />
          )}
          {state.type === MODAL_BODY_TYPES.CONFIRM && (
            <Confirm {...{...state.extra}} />
          )}
        </div>
      </div>
    </>
  );
}
