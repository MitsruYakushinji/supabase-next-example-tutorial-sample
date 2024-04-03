'use client';

import {Cog6ToothIcon} from '@heroicons/react/24/outline';
import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';

import {
  linkTagQuickPanelState,
  quickPanelState,
} from '../../lib/features/quick-panel';

type Props = Parameters<typeof linkTagQuickPanelState>[0];

export default function LinkTag({title, id, type, selectedTagIds}: Props) {
  const setState = useSetRecoilState(quickPanelState);

  const handleClick = useCallback(() => {
    setState(linkTagQuickPanelState({title, id, type, selectedTagIds}));
  }, [title, id, type, selectedTagIds, setState]);

  return (
    <Cog6ToothIcon
      className="inline h-4 w-4 shrink-0 cursor-pointer self-center"
      onClick={handleClick}
    />
  );
}
