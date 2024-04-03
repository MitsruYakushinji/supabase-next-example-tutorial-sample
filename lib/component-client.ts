import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {Database} from './types/database';

export function getComponentClient() {
  return createClientComponentClient<Database>();
}
