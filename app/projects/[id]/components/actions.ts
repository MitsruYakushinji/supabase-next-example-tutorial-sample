'use server';

import {revalidatePath} from 'next/cache';
import {z} from 'zod';

import {getActionClient} from 'lib/action-client';

const unregisterComponentValidations = z.object({
  /**
   * プロジェクトID
   */
  project_id: z.string(),
  /**
   * コンポーネントID
   */
  component_id: z.string(),
});

/**
 * コンポーネントの紐付け解除
 */
export async function unregisterComponent(
  e: FormData
): Promise<{result: true; error: null} | {result: false; error: string}> {
  const supabase = getActionClient();
  try {
    const params = unregisterComponentValidations.parse(
      Object.fromEntries(e.entries())
    );
    const {error} = await supabase
      .from('project_components')
      .delete()
      .eq('project_id', params.project_id)
      .eq('component_id', params.component_id);
    if (error) {
      console.error(error);
      return {result: false, error: error.message};
    }
    revalidatePath('/');
    return {result: true, error: null};
  } catch (error) {
    console.error(error);
    return {result: false, error: 'failed to unregister component'};
  }
}
