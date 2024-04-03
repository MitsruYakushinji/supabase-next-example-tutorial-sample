import {MODAL_BODY_TYPES} from './constants';

interface ModalStateBase {
  isOpen: boolean;
  size: '' | 'lg';
  title: string;
  type: string;
  extra: unknown;
}

export type ModalState =
  | CreateProjectModalState
  | CreateTagModalState
  | CloseModalState
  | ProjectRegisterComponentModalState
  | TemplateRegisterComponentModalState
  | ConfirmModalState;

interface CloseModalState extends ModalStateBase {
  type: typeof MODAL_BODY_TYPES.CLOSE;
}

/**
 * プロジェクト作成
 */
interface CreateProjectModalState extends ModalStateBase {
  type: typeof MODAL_BODY_TYPES.CREATE_PROJECT;
}

/**
 * タグ作成
 */
interface CreateTagModalState extends ModalStateBase {
  type: typeof MODAL_BODY_TYPES.CREATE_TAG;
}

/**
 * プロジェクトへのコンポーネント登録
 */
interface ProjectRegisterComponentModalState extends ModalStateBase {
  type: typeof MODAL_BODY_TYPES.PROJECT_REGISTER_COMPONENT;
  extra: {
    projectId: string;
    completed: () => void;
  };
}

/**
 * テンプレートへのコンポーネント登録
 */
interface TemplateRegisterComponentModalState extends ModalStateBase {
  type: typeof MODAL_BODY_TYPES.TEMPLATE_REGISTER_COMPONENT;
  extra: {
    templateId: string;
    completed: () => void;
  };
}

/**
 * 確認モーダル
 */
interface ConfirmModalState extends ModalStateBase {
  type: typeof MODAL_BODY_TYPES.CONFIRM;
  extra: {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
}
