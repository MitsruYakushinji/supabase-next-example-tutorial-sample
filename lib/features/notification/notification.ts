import {SetterOrUpdater, atom} from 'recoil';

import {NotificationState} from './types';

export const notificationState = atom<NotificationState>({
  key: 'notificationState',
  default: [],
});

export function addNotification(
  notification: NotificationState[number],
  set: SetterOrUpdater<NotificationState>
) {
  set(prev => [...prev, notification]);
}

export function removeNotification(
  id: string,
  set: SetterOrUpdater<NotificationState>
) {
  set(prev => prev.filter(item => item.id !== id));
}
