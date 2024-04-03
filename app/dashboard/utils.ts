import {getServerClient} from 'lib/server-client';

import {DOWN, UP} from './constants';

interface Stats {
  value: number;
  description: string;
}

/**
 * プロジェクトの統計情報を取得
 */
export async function getProjectStats(
  supabase: ReturnType<typeof getServerClient>
): Promise<Stats> {
  // /**
  //  * 現在のプロジェクト数を取得
  //  */
  // const total = await supabase
  //   .from('projects')
  //   .select('*', {count: 'exact', head: true});

  // if (total.error) {
  //   console.log(total);
  // }

  // /**
  //  * 本日の新規プロジェクト数を取得
  //  */
  // const created = await supabase
  //   .from('projects')
  //   .select('*', {count: 'exact', head: true})
  //   .gte('inserted_at', getDate())
  //   .lt('inserted_at', getNextDate());
  // if (created.error) {
  //   console.log(created);
  // }

  // /**
  //  * 本日の削除済みのプロジェクト数を取得
  //  */
  // const deleted = await supabase
  //   .schema('deleted')
  //   .from('projects')
  //   .select('*', {count: 'exact', head: true})
  //   .gte('deleted_at', getDate())
  //   .lt('deleted_at', getNextDate());
  // if (deleted.error) {
  //   console.log(deleted);
  // }

  // rpcに変更（参考のために上記のソースは残しておく）
  const {data, error} = await supabase.rpc('get_project_stats');

  if (error || !data) {
    console.log(error);
    return {value: 0, description: ''};
  }

  /**
   * 増減判定
   */
  const diff = (data.created || 0) - (data.deleted || 0);

  return {
    value: data.total || 0,
    description: `${
      diff === 0 ? '' : diff > 0 ? `${UP} ${diff}` : `${DOWN} ${Math.abs(diff)}`
    }`,
  };
}

/**
 * 指定したテーブルの統計情報を取得する
 * descriptionは空文字が返却される
 */
async function getStatsOnlyValue(
  supabase: ReturnType<typeof getServerClient>,
  table: 'users' | 'components' | 'templates'
): Promise<Stats> {
  const {count, error} = await supabase
    .from(table)
    .select('*', {count: 'exact', head: true});

  if (error) {
    console.log(error);
    return {value: 0, description: ''};
  }
  return {value: count || 0, description: ''};
}

/**
 * ユーザーの統計情報を取得
 */
export function getUserStats(
  supabase: ReturnType<typeof getServerClient>
): Promise<Stats> {
  return getStatsOnlyValue(supabase, 'users');
}

/**
 * コンポーネントの統計情報を取得
 */
export function getComponentStats(
  supabase: ReturnType<typeof getServerClient>
): Promise<Stats> {
  return getStatsOnlyValue(supabase, 'components');
}

/**
 * テンプレートの統計情報を取得
 */
export function getTemplateStats(
  supabase: ReturnType<typeof getServerClient>
): Promise<Stats> {
  return getStatsOnlyValue(supabase, 'templates');
}
