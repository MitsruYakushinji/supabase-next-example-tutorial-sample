'use client';

import {XMarkIcon} from '@heroicons/react/24/outline';
import {useCallback} from 'react';
import {useResetRecoilState, useSetRecoilState} from 'recoil';

import {confirmModalState, modalState} from 'lib/features/modal';
import {useResultNotification} from 'lib/features/notification/hooks';

import {unregisterComponent} from './actions';

export default function RemoveButton({
  projectId,
  componentId,
}: {
  projectId: string;
  componentId: string;
}) {
  const setState = useSetRecoilState(modalState);
  const setClose = useResetRecoilState(modalState);
  const notifyResult = useResultNotification();

  /**
   * 紐付け解除の実行
   */
  const handleOnConfirm = useCallback(async () => {
    const formData = new FormData();
    formData.append('project_id', projectId);
    formData.append('component_id', componentId);

    // 実行
    const {result, error} = await unregisterComponent(formData);
    notifyResult(result, 'Unregistered', error || 'Failed to unregister');
    setClose();
  }, [projectId, componentId, setClose, notifyResult]);

  const onClick = useCallback(() => {
    setState(
      confirmModalState({
        message: 'プロジェクトとの紐付けを解除しますか？',
        onConfirm: handleOnConfirm,
        onCancel: setClose,
      })
    );
  }, [setState, handleOnConfirm, setClose]);

  return (
    <button className="btn btn-square btn-ghost" onClick={onClick}>
      {/* アイコン変えたい */}
      <XMarkIcon className="w-5" />
    </button>
  );
}
