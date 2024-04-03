'use server';

import {revalidatePath} from 'next/cache';
import {z} from 'zod';

import {getActionClient} from 'lib/action-client';

const usernameValidations = z.object({
  username: z.string(),
  id: z.string(),
});
export async function updateUsername(
  e: FormData
): Promise<{result: true; error: null} | {result: false; error: string}> {
  try {
    const {username, id} = usernameValidations.parse(
      Object.fromEntries(e.entries())
    );
    const supabase = getActionClient();
    const {error} = await supabase
      .from('users')
      .update({username})
      .eq('id', id);
    if (error) {
      console.log(error);
      return {result: false, error: error.message};
    }
    revalidatePath('/settings/profile');
    return {result: true, error: null};
  } catch (error) {
    return {result: false, error: 'invalid username'};
  }
}

const passwordValidations = z.object({
  password: z.string().min(4),
});

export async function updatePassword(
  e: FormData
): Promise<{result: true; error: null} | {result: false; error: string}> {
  try {
    const {password} = passwordValidations.parse(
      Object.fromEntries(e.entries())
    );
    const supabase = getActionClient();
    const {error} = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      console.log(error);
      return {result: false, error: error.message};
    }
    return {result: true, error: null};
  } catch (error) {
    return {result: false, error: 'invalid password'};
  }
}
