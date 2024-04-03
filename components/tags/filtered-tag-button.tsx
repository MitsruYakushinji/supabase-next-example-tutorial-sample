'use client';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {usePathname, useRouter} from 'next/navigation';

export default function FilteredTagButton({name}: {name: string}) {
  const router = useRouter();
  const pathname = usePathname();
  /**
   * 押下でクエリストリングなしのURLに遷移(絞り込み解除)
   */
  const onClick = () => {
    router.push(pathname || '/');
  };

  return (
    <button
      className="btn btn-ghost btn-active btn-xs rounded-lg normal-case"
      onClick={onClick}
    >
      {name}
      <XMarkIcon className="ml-2 w-4" />
    </button>
  );
}
