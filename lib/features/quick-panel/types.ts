import {Merge} from 'type-fest';

import {QUICK_PANEL_TYPES} from './constants';

interface QuickPanelStateBase {
  isOpen: boolean;
  size: '' | 'lg';
  disableOtherClickClose: boolean;
  title: string;
  type: string;
  extra: unknown;
}

export type QuickPanelState =
  | TodayQuickPanelState
  | LinkTagQuickPanelState
  | CloseQuickPanelState;

interface CloseQuickPanelState extends QuickPanelStateBase {
  type: typeof QUICK_PANEL_TYPES.CLOSE;
}

export interface LinkTagQuickPanelState extends QuickPanelStateBase {
  type: typeof QUICK_PANEL_TYPES.LINK_TAG;
  extra: {
    id: string;
    type: 'component' | 'page';
    selectedTagIds: number[];
  };
}

/**
 * TEST
 * TODAY
 */
interface TodayQuickPanelState extends QuickPanelStateBase {
  type: typeof QUICK_PANEL_TYPES.TODAY;
}

export type ActionParameters<
  T extends (typeof QUICK_PANEL_TYPES)[keyof typeof QUICK_PANEL_TYPES],
  TitleRequired extends boolean = false,
> = Merge<
  Extract<QuickPanelState, {type: T}>['extra'],
  TitleRequired extends false
    ? Partial<Pick<QuickPanelState, 'title'>>
    : Pick<QuickPanelState, 'title'>
>;
