'use client';

import {ReactNode} from 'react';
import {RecoilRoot} from 'recoil';

export default function Provider({children}: {children: ReactNode}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
