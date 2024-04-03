import {atom} from 'recoil';

import {QUICK_PANEL_TYPES} from './constants';
import {ActionParameters, QuickPanelState} from './types';

export const quickPanelState = atom<QuickPanelState>({
  key: 'quickPanelState',
  default: closeQuickPanelState(),
});

/**
 * 閉じる
 */
export function closeQuickPanelState(): QuickPanelState {
  return {
    isOpen: false,
    size: '',
    title: '',
    disableOtherClickClose: false,
    type: QUICK_PANEL_TYPES.CLOSE,
    extra: {},
  };
}

/**
 * タグの紐づけ
 */
export function linkTagQuickPanelState({
  title,
  id,
  type,
  selectedTagIds,
}: ActionParameters<typeof QUICK_PANEL_TYPES.LINK_TAG, true>): QuickPanelState {
  return {
    isOpen: true,
    size: 'lg',
    title,
    disableOtherClickClose: false,
    type: QUICK_PANEL_TYPES.LINK_TAG,
    extra: {
      id,
      type,
      selectedTagIds,
    },
  };
}

/**
 * プロジェクト作成
 */
export function todayQuickPanelState(): QuickPanelState {
  return {
    isOpen: true,
    size: 'lg',
    title: 'TODAY',
    disableOtherClickClose: false,
    type: QUICK_PANEL_TYPES.TODAY,
    extra: {},
  };
}
