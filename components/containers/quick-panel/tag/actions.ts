'use server';

import {revalidatePath} from 'next/cache';
import {z} from 'zod';

import {getActionClient} from 'lib/action-client';

const linkTagValidations = z.array(z.string());

/**
 * ページとタグの紐づけを更新
 */
export async function updateComponentTags(
  id: string,
  e: FormDataEntryValue[],
  // 元々選択されていたタグのID配列
  selectedTagIds: number[]
): Promise<{result: true; error: null} | {result: false; error: string}> {
  const supabase = getActionClient();

  try {
    const params = linkTagValidations.parse(e);

    /**
     * 挿入と削除のためのID配列を作成
     */
    const {idsToInsert, idsToDelete} = formatTagForm(params, selectedTagIds);

    const {error: deleteError} =
      idsToDelete.length > 0
        ? await supabase
            .from('component_tags')
            .delete()
            .in('tag_id', idsToDelete)
        : {error: null};
    const {error: insertError} =
      idsToInsert.length > 0
        ? await supabase
            .from('component_tags')
            .upsert(idsToInsert.map(tag_id => ({component_id: id, tag_id})))
        : {error: null};

    const error = deleteError || insertError;
    if (error) {
      console.log(error);
      return {result: false, error: error.message};
    }
    revalidatePath('/');
    return {result: true, error: null};
  } catch (error) {
    return {result: false, error: 'failed to link tags'};
  }
}

/**
 * ページとタグの紐づけを更新
 */
export async function updatePageTags(
  id: string,
  e: FormDataEntryValue[],
  // 元々選択されていたタグのID配列
  selectedTagIds: number[]
): Promise<{result: true; error: null} | {result: false; error: string}> {
  const supabase = getActionClient();

  try {
    const params = linkTagValidations.parse(e);

    /**
     * 挿入と削除のためのID配列を作成
     */
    const {idsToInsert, idsToDelete} = formatTagForm(params, selectedTagIds);

    const {error: deleteError} =
      idsToDelete.length > 0
        ? await supabase.from('page_tags').delete().in('tag_id', idsToDelete)
        : {error: null};
    const {error: insertError} =
      idsToInsert.length > 0
        ? await supabase
            .from('page_tags')
            .upsert(idsToInsert.map(tag_id => ({page_id: id, tag_id})))
        : {error: null};
    const error = deleteError || insertError;
    if (error) {
      console.log(error);
      return {result: false, error: error.message};
    }
    revalidatePath('/');
    return {result: true, error: null};
  } catch (error) {
    return {result: false, error: 'failed to link tags'};
  }
}

/**
 * タグ紐づけフォームの情報を整形して返却
 * @param tagIds formから取得したタグID配列
 * @param selectedTagIds 元々選択されていたタグのID配列
 */
function formatTagForm(
  tagIds: ReturnType<typeof linkTagValidations.parse>,
  selectedTagIds: number[]
): {idsToInsert: number[]; idsToDelete: number[]} {
  const idsToInsert: number[] = tagIds
    .filter(id => !selectedTagIds.includes(+id))
    .map(id => +id);
  const idsToDelete: number[] = selectedTagIds.filter(
    id => !tagIds.includes(id.toString())
  );

  return {idsToInsert, idsToDelete};
}
