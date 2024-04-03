import {getServerClient} from './server-client';

/**
 * サムネイル画像のパスを取得
 */
export function getThumbnailPath(
  supabase: ReturnType<typeof getServerClient>,
  id: string
): string {
  return supabase.storage.from('thumbnails').getPublicUrl(id).data.publicUrl;
}
