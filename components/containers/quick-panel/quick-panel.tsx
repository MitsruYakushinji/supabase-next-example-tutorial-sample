'use client';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import clsx from 'clsx';
import {useRecoilState} from 'recoil';

import {
  QUICK_PANEL_TYPES,
  closeQuickPanelState,
  quickPanelState,
} from '../../../lib/features/quick-panel';
import {LinkTag} from './tag';

export default function QuickPanel() {
  const [state, setState] = useRecoilState(quickPanelState);

  const close = () => {
    if (!state.disableOtherClickClose) {
      setState(closeQuickPanelState());
    }
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-20 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out',
        {
          'translate-x-0 opacity-100 transition-opacity duration-500':
            state.isOpen,
          'translate-x-full opacity-0 transition-all delay-500': !state.isOpen,
        }
      )}
    >
      <section
        className={clsx(
          'delay-400 absolute right-0 h-full w-80 transform bg-base-100 shadow-xl transition-all duration-500 ease-in-out md:w-96',
          {
            'translate-x-0': state.isOpen,
            'translate-x-full': !state.isOpen,
          }
        )}
      >
        <div className="relative flex h-full flex-col pb-5">
          {/* Header */}
          <div className="navbar flex px-4 shadow-md">
            <button
              className="btn btn-circle btn-outline btn-sm float-left"
              onClick={close}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <span className="ml-2 text-xl font-bold">{state.title}</span>
          </div>

          {/* ------------------ Content Start ------------------ */}
          <div className="flex-auto overflow-y-scroll px-4">
            <div className="flex h-full w-full flex-col">
              {/* Loading drawer body according to different drawer type */}
              {state.type === QUICK_PANEL_TYPES.TODAY && (
                <>
                  {new Date().toISOString()}
                  {JSON.stringify(state.extra)}
                </>
              )}
              {state.type === QUICK_PANEL_TYPES.LINK_TAG && (
                <LinkTag {...{...state.extra}} close={close} />
              )}
              {state.type === QUICK_PANEL_TYPES.CLOSE && <div></div>}
            </div>
          </div>
          {/* ------------------ Content End ------------------ */}
        </div>
      </section>

      <section
        className="h-full w-screen cursor-pointer"
        onClick={close}
        onKeyDown={close}
        tabIndex={-1}
        role="button"
      ></section>
    </div>
  );
}
