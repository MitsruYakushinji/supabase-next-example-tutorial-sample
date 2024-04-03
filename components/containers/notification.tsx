'use client';

import clsx from 'clsx';
import {useEffect} from 'react';
import {UnwrapRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {delay, of} from 'rxjs';

import {
  notificationState,
  removeNotification,
} from '../../lib/features/notification';

export default function Notification() {
  const [state] = useRecoilState(notificationState);
  return (
    <div className="toast toast-end pointer-events-none z-[999]">
      {state.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

function Item({
  id,
  type,
  message,
  description,
  disableClose,
  disableIcon,
}: UnwrapRecoilValue<typeof notificationState>[number]) {
  const setState = useSetRecoilState(notificationState);
  useEffect(() => {
    const subscription = of(id)
      .pipe(delay(5000))
      .subscribe(id => {
        removeNotification(id, setState);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [id, setState]);
  return (
    <div
      className={clsx('alert', 'w-80', 'shadow', 'pointer-events-auto', {
        'alert-info': type === 'info',
        'alert-success': type === 'success',
        'alert-warning': type === 'warning',
        'alert-error': type === 'error',
      })}
    >
      {!disableIcon && (
        <>
          {type === 'default' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-info"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )}
          {type === 'info' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )}
          {type === 'success' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {type === 'warning' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {type === 'error' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </>
      )}
      {!description ? (
        <span className="whitespace-pre-wrap break-all">{message}</span>
      ) : (
        <div className="whitespace-pre-wrap break-all">
          <h3 className="font-bold">{message}</h3>
          <div className="text-xs">{description}</div>
        </div>
      )}
      {!disableClose && (
        <button
          className="btn btn-circle btn-sm"
          onClick={() => removeNotification(id, setState)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
