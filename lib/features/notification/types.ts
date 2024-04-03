import {NOTIFICATION_TYPES} from './constants';

interface Notification {
  /**
   * 通知ID
   */
  id: string;
  /**
   * メッセージ
   */
  message: string;
  /**
   * 注釈
   */
  description?: string;
  /**
   * アイコンを表示しない
   * @default false
   */
  disableIcon?: boolean;
  /**
   * 閉じるボタンを表示しない
   * @default false
   */
  disableClose?: boolean;
  /**
   * 通知タイプ
   */
  type: (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];
}

export type NotificationState = Notification[];
