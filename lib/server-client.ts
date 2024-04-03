import {User, createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

import {Database} from './types/database';

export function getServerClient() {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({cookies: () => cookieStore});
}

export async function getServerUser(): Promise<User | null> {
  const supabase = getServerClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  return user;
}
