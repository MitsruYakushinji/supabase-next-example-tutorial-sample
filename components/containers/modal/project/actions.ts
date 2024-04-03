'use server';

import {revalidatePath} from 'next/cache';
import {z} from 'zod';

import {getActionClient} from 'lib/action-client';

const registerComponentValidations = z.object({
  /**
   * プロジェクトID
   */
  project_id: z.string(),
  /**
   * コンポーネントID
   */
  component_id: z.string(),
  /**
   * params
   */
  params: z.unknown(),
});

export async function registerComponent(
  e: FormData
): Promise<{result: true; error: null} | {result: false; error: string}> {
  const supabase = getActionClient();
  try {
    const params = registerComponentValidations.parse(
      Object.fromEntries(e.entries())
    );
    const {error} = await supabase.from('project_components').insert([
      {
        project_id: params.project_id,
        component_id: params.component_id,
        params: {},
      },
    ]);
    if (error) {
      return {result: false, error: error.message};
    }
    revalidatePath('/');
    return {result: true, error: null};
  } catch (error) {
    console.error(error);
    return {result: false, error: 'Invalid params'};
  }
}
