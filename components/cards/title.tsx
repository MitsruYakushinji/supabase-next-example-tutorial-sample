import clsx from 'clsx';

import Subtitle from '../typography/subtitle';

export default function TitleCard({
  title,
  children,
  topMargin,
  TopSideButtons,
}: {
  title: string;
  children: React.ReactNode;
  topMargin?: string;
  TopSideButtons?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'card w-full bg-base-100 p-6 shadow-xl',
        topMargin || 'mt-6'
      )}
    >
      {/* Title for Card */}
      <Subtitle className={clsx({'inline-block': !!TopSideButtons})}>
        {title}
        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className="float-right inline-block">{TopSideButtons}</div>
        )}
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full bg-base-100 pb-6">{children}</div>
    </div>
  );
}
