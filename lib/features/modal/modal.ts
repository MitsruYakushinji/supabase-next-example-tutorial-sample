import {atom} from 'recoil';

import {MODAL_BODY_TYPES} from './constants';
import {ModalState} from './types';

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: closeModalState(),
});

/**
 * 閉じる
 */
export function closeModalState(): ModalState {
  return {
    isOpen: false,
    size: '',
    title: '',
    type: MODAL_BODY_TYPES.CLOSE,
    extra: {},
  };
}

/**
 * プロジェクト作成
 */
export function createProjectModalState(): ModalState {
  return {
    isOpen: true,
    size: 'lg',
    title: 'プロジェクト作成',
    type: MODAL_BODY_TYPES.CREATE_PROJECT,
    extra: {},
  };
}

export function createTagModalState(): ModalState {
  return {
    isOpen: true,
    size: 'lg',
    title: 'タグ作成',
    type: MODAL_BODY_TYPES.CREATE_TAG,
    extra: {},
  };
}

/**
 * プロジェクトへのコンポーネント登録
 */
export function projectRegisterComponentModalState(extra: {
  projectId: string;
  completed: () => void;
}): Extract<
  ModalState,
  {type: typeof MODAL_BODY_TYPES.PROJECT_REGISTER_COMPONENT}
> {
  return {
    isOpen: true,
    size: 'lg',
    title: 'プロジェクトへのコンポーネント登録',
    type: MODAL_BODY_TYPES.PROJECT_REGISTER_COMPONENT,
    extra,
  };
}

/**
 * テンプレートへのコンポーネント登録
 */
export function templateRegisterComponentModalState(extra: {
  templateId: string;
  completed: () => void;
}): Extract<
  ModalState,
  {type: typeof MODAL_BODY_TYPES.TEMPLATE_REGISTER_COMPONENT}
> {
  return {
    isOpen: true,
    size: 'lg',
    title: 'テンプレートへのコンポーネント登録',
    type: MODAL_BODY_TYPES.TEMPLATE_REGISTER_COMPONENT,
    extra,
  };
}

/**
 * 確認モーダル
 */
export function confirmModalState(extra: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}): Extract<ModalState, {type: typeof MODAL_BODY_TYPES.CONFIRM}> {
  return {
    isOpen: true,
    size: '',
    title: '確認',
    type: MODAL_BODY_TYPES.CONFIRM,
    extra,
  };
}
