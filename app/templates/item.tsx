'use client';

import {useRouter} from 'next/navigation';

import {formatDate} from 'lib/date';
import {Database} from 'lib/types/database';

export default function Item({
  id,
  name,
  inserted_at,
  description,
}: Database['public']['Tables']['templates']['Row']) {
  const router = useRouter();
  /**
   * コンポーネント一覧へ遷移
   */
  const moveComponents = () => {
    router.push(`/templates/${id}/components`);
  };

  return (
    <tr className="hover cursor-pointer" onClick={moveComponents}>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12 bg-base-300"></div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>{formatDate(inserted_at)}</td>
      <td>{description}</td>
    </tr>
  );
}
