import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {useCallback, useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {getComponentClient} from 'lib/component-client';
import {useResultNotification} from 'lib/features/notification/hooks';
import {Database} from 'lib/types/database';

import {createTagModalState, modalState} from '../../../../lib/features/modal';
import {linkTagQuickPanelState} from '../../../../lib/features/quick-panel';
import {updateComponentTags, updatePageTags} from './actions';

const FORM_ID = 'link-tag';
const INPUT_NAME = 'tag_ids[]';

type TagData = Database['public']['Tables']['tags']['Row'];
type Props = Omit<Parameters<typeof linkTagQuickPanelState>[0], 'title'>;

export default function LinkTag({
  id,
  type,
  selectedTagIds,
  close,
}: Props & {close: () => void}) {
  const supabase = getComponentClient();
  const [tags, setTags] = useState<TagData[]>([]);
  const notifyResult = useResultNotification();

  /**
   * タグを取得する
   */
  useEffect(() => {
    async function fetchTags() {
      const tags = await supabase.from('tags').select('*');
      if (tags.error) {
        console.error(tags.error);
      }
      setTags(tags.data || []);
    }
    fetchTags();
  }, [supabase]);

  /**
   * タグの紐づけを更新
   */
  async function linkTagForm(e: FormData) {
    // FormDataから特定のキーの値を取得して配列に変換
    const tagIds = e.getAll(INPUT_NAME);

    // 更新
    const updateTags =
      type === 'component' ? updateComponentTags : updatePageTags;
    const {result, error} = await updateTags(id, tagIds, selectedTagIds);

    notifyResult(result, 'Updated', error || 'Failed');
    result && close();
  }

  const setModalState = useSetRecoilState(modalState);
  /**
   * 新規タグ作成モーダルを開く
   */
  const onClickCreateNewTag = useCallback(() => {
    close();
    setModalState(createTagModalState());
  }, [close, setModalState]);

  return (
    <div className="flex min-h-0 flex-auto flex-col">
      {/* description */}
      <div className="mb-0.5 mt-2 pl-2 text-sm font-semibold">
        Apply tags to this {type}
      </div>
      <div className="divider m-0" />

      {/* tag list */}
      <form
        id={FORM_ID}
        className="relative flex flex-auto flex-col overflow-y-auto overscroll-y-none"
        action={linkTagForm}
      >
        <ul className="menu p-0 [&_li>*]:rounded-none">
          {tags.map(tag => (
            <Tag
              key={tag.id}
              {...tag}
              selected={selectedTagIds.includes(tag.id)}
            />
          ))}
        </ul>
      </form>

      {/* button */}
      <div className="mt-2">
        <button className="btn btn-primary btn-block" form={FORM_ID}>
          Save
        </button>
        <button
          type="button"
          className="btn btn-accent btn-block mt-2"
          onClick={onClickCreateNewTag}
        >
          Create new tag
        </button>
      </div>
    </div>
  );
}

function Tag({
  id,
  name,
  color,
  description,
  selected,
}: TagData & {selected: boolean}) {
  const [showChecked, setShowChecked] = useState(selected);

  const handleClick = useCallback(() => {
    setShowChecked(prev => !prev);
  }, []);

  const inputId = `tag-${id}`;

  return (
    <li>
      <label className="relative grid-flow-row gap-0 px-8" htmlFor={inputId}>
        {showChecked && <CheckIcon className="absolute left-2 mt-0.5 w-4" />}
        <input
          hidden
          type="checkbox"
          id={inputId}
          name={INPUT_NAME}
          value={id}
          checked={showChecked}
          onChange={handleClick}
        />
        <div>
          <span
            className="mr-2 inline-block h-4 w-4 rounded-full align-text-top"
            style={{background: color}}
          />
          <span className="align-text-bottom">{name}</span>
        </div>
        {description && (
          <div className="text-xs text-gray-500">{description}</div>
        )}
        {showChecked && <XMarkIcon className="absolute right-2 mt-0.5 w-4" />}
      </label>
    </li>
  );
}
