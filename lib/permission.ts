import {getServerClient} from './server-client';

/**
 * 権限情報の取得
 */
export async function getUserPermission(
  supabase: ReturnType<typeof getServerClient>
): Promise<{create: boolean; delete: boolean}> {
  const permission = {
    create: false,
    delete: false,
  };

  const {
    data: {user},
  } = await supabase.auth.getUser();
  if (user) {
    const {data, error} = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);
    if (!error && data) {
      const roles = data.map(d => d.role);
      if (roles.includes('admin')) {
        permission.create = true;
        permission.delete = true;
      }
    }
  }

  return permission;
}
