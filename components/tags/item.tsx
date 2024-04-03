'use client';

import clsx from 'clsx';
import {usePathname, useRouter} from 'next/navigation';
import {useCallback} from 'react';

import style from './style.module.css';
import {hexToRgb, rgbToHsl} from './utils';

export function Item({
  name,
  color,
  disableClick = false,
}: {
  name: string;
  color: string;
  disableClick?: boolean;
}) {
  const {r, g, b} = hexToRgb(color);
  const {h, s, l} = rgbToHsl(r, g, b);
  const tagStyle = {
    '--tag-r': r,
    '--tag-g': g,
    '--tag-b': b,
    '--tag-h': h,
    '--tag-s': s,
    '--tag-l': l,
  } as React.CSSProperties;

  const router = useRouter();
  const pathname = usePathname();
  const onClick = useCallback(() => {
    if (!disableClick) {
      router.push(`${pathname}?tag=${name}`);
    }
  }, [router, pathname, name, disableClick]);

  return (
    <button
      className={clsx(
        `border-1 whitespace-nowrap rounded-full border border-solid px-2.5 py-0.5 text-xs font-medium ${style.tag}`,
        {'cursor-pointer': !disableClick}
      )}
      style={tagStyle}
      onClick={onClick}
      onKeyDown={onClick}
    >
      {name}
    </button>
  );
}
