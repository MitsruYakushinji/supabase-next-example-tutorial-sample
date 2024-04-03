'use server';

import {z} from 'zod';

import {getActionClient} from 'lib/action-client';

const registTagValidations = z.object({
  /**
   * タグ名
   */
  name: z.string(),
  /**
   * タグの説明
   */
  description: z.string().optional(),
  /**
   * タグの色
   */
  color: z.string(),
});

export async function registerTag(
  e: FormData
): Promise<{result: true; error: null} | {result: false; error: string}> {
  const supabase = getActionClient();
  try {
    const params = registTagValidations.parse(Object.fromEntries(e.entries()));
    const {error} = await supabase.from('tags').insert([params]);
    if (error) {
      return {result: false, error: error.message};
    }
    return {result: true, error: null};
  } catch (error) {
    console.error(error);
  }
  return {result: false, error: 'Invalid tag'};
}
