import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {v4 as uuidv4} from 'uuid';

import {NOTIFICATION_TYPES} from '../constants';
import {addNotification, notificationState} from '../notification';

/**
 * 成功 / 失敗通知hooks
 */
export function useResultNotification() {
  const setState = useSetRecoilState(notificationState);

  const notify = useCallback(
    (result: boolean, successMessage: string, errorMessage: string) => {
      if (result) {
        addNotification(
          {
            type: NOTIFICATION_TYPES.SUCCESS,
            message: successMessage,
            id: uuidv4(),
          },
          setState
        );
      } else {
        addNotification(
          {
            type: NOTIFICATION_TYPES.ERROR,
            message: errorMessage,
            id: uuidv4(),
          },
          setState
        );
      }
    },
    [setState]
  );

  return notify;
}
