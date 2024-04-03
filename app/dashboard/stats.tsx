import clsx from 'clsx';

import {DOWN, UP} from './constants';

interface Props {
  /**
   * タイトル
   */
  title: string;
  /**
   * アイコン
   */
  icon: React.ReactNode;
  /**
   * 値
   */
  value: string;
  /**
   * 説明
   */
  description: string;
}
function getDescStyle(description: string) {
  if (description.includes(UP))
    return 'font-bold text-green-700 dark:text-green-300';
  else if (description.includes(DOWN))
    return 'font-bold text-rose-500 dark:text-red-400';
  else return '';
}
export function Stats({title, description, icon, value}: Props) {
  const descStyle = getDescStyle(description);

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-primary">{icon}</div>
        <div className="stat-title">{title}</div>
        <div className="stat-value text-primary">{value}</div>
        <div className={clsx('stat-desc', descStyle)}>{description}</div>
      </div>
    </div>
  );
}
