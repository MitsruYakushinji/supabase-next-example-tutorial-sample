import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import {Metadata} from 'next';
import Image from 'next/image';

import TitleCard from 'components/cards/title';
import {FilteredTagButton, LinkTag, Tags} from 'components/tags';
import {getSearchTag} from 'components/tags/utils';
import {formatDate} from 'lib/date';
import {getServerClient} from 'lib/server-client';
import {getThumbnailPath} from 'lib/thumbnail';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'COMPONENTS | BASE',
};

export default async function Components({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const supabase = getServerClient();

  /**
   * searchParamsからtagのnameを取得
   */
  const searchTag = getSearchTag(searchParams);

  /**
   * コンポーネントデータ
   */
  const components = searchTag
    ? // タグでの絞り込みあり
      await supabase
        .from('components')
        .select('*, tags!inner(*)')
        .eq('tags.name', searchTag)
    : // 絞り込みなし
      await supabase.from('components').select('*, tags(*)');
  if (components.error) {
    console.error(components.error);
  }
  const componentsData = components.data || [];

  const getThumbnail = (id: string) => getThumbnailPath(supabase, id);

  return (
    <TitleCard
      title=""
      topMargin="mt-2"
      TopSideButtons={
        searchTag && (
          <>
            <FunnelIcon className="mr-2 inline-block w-6 align-bottom" />
            <FilteredTagButton name={searchTag} />
          </>
        )
      }
    >
      {/* Leads List in table format loaded from slice after api call */}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Description</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {componentsData.map(component => {
              return (
                <tr key={component.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 bg-base-300">
                          {component.has_image && (
                            <Image
                              src={getThumbnail(component.id)}
                              alt="Thumbnail"
                              width={48}
                              height={48}
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{component.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(component.inserted_at)}</td>
                  <td>{component.description}</td>
                  <td>
                    <div className="flex gap-1">
                      <Tags tags={component.tags} />
                      <LinkTag
                        title={component.name}
                        id={component.id}
                        type="component"
                        selectedTagIds={component.tags.map(tag => tag.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}
