import {redirect} from 'next/navigation';

import TitleCard from 'components/cards/title';
import {getServerClient, getServerUser} from 'lib/server-client';

import {PasswordForm, UsernameForm} from './form';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth');
  }

  const supabase = getServerClient();
  const {data} = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  const username = data?.username || 'username';

  return (
    <TitleCard title="Profile Settings" topMargin="mt-2">
      <UsernameForm>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="form-control w-full max-w-xs">
            <input type="hidden" name="id" defaultValue={user.id} />
            <label htmlFor="profile-username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="profile-username"
              type="text"
              placeholder="User name"
              className="input input-bordered w-full max-w-xs"
              required
              minLength={4}
              name="username"
              defaultValue={username}
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="btn btn-primary float-right">
              Update
            </button>
          </div>
        </div>
      </UsernameForm>
      <div className="divider"></div>

      <PasswordForm>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="form-control w-full max-w-xs">
            <label htmlFor="profile-password" className="label">
              <span className="label-text">New password</span>
            </label>
            <input type="hidden" name="id" defaultValue={user.id} />
            <input
              id="profile-password"
              type="password"
              placeholder="password"
              className="input input-bordered w-full max-w-xs"
              required
              minLength={4}
              name="password"
              autoComplete="none"
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="btn btn-primary float-right">
              Update
            </button>
          </div>
        </div>
      </PasswordForm>
    </TitleCard>
  );
}
