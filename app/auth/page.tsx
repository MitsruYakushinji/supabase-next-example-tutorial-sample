import {redirect} from 'next/navigation';

import {getServerUser} from 'lib/server-client';

import AuthComponent from './auth';
import LandingIntro from './landing-intro';

export const runtime = 'edge';

export default async function Page() {
  const user = await getServerUser();

  if (user) {
    redirect('/');
  }

  return (
    <AuthComponent>
      <div className="">
        <LandingIntro />
      </div>
    </AuthComponent>
  );
}
