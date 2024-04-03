import Link from 'next/link';
import {redirect} from 'next/navigation';

import {getServerUser} from 'lib/server-client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const user = await getServerUser();
  console.log(user);
  if (!user) {
    redirect('/auth');
  }

  return (
    <p>
      TOP
      <Link href="/dashboard">DASHBOARD</Link>
    </p>
  );
}
