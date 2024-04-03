import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

import {Database} from './types/database';

export function getActionClient() {
  const cookieStore = cookies();
  return createServerActionClient<Database>({cookies: () => cookieStore});
}
