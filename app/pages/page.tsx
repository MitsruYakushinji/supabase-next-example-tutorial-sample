import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import {Metadata} from 'next';

import TitleCard from 'components/cards/title';
import {FilteredTagButton, LinkTag, Tags} from 'components/tags';
import {getSearchTag} from 'components/tags/utils';
import {formatDate} from 'lib/date';
import {getServerClient} from 'lib/server-client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PAGES | BASE',
};

export default async function Pages({
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
   * ページデータ
   */
  const pages = searchTag
    ? // タグでの絞り込みあり
      await supabase
        .from('pages')
        .select('*, tags!inner(*)')
        .eq('tags.name', searchTag)
    : // 絞り込みなし
      await supabase.from('pages').select('*, tags(*)');
  if (pages.error) {
    console.error(pages.error);
  }
  const pagesData = pages.data || [];

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
            {pagesData.map(page => {
              return (
                <tr key={page.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 bg-base-300">
                          {/* <Image src={l.avatar} alt="Avatar" priority /> */}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{page.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(page.inserted_at)}</td>
                  <td>{page.description}</td>
                  <td>
                    <div className="flex gap-1">
                      <Tags tags={page.tags} />
                      <LinkTag
                        title={page.name}
                        id={page.id}
                        type="page"
                        selectedTagIds={page.tags.map(tag => tag.id)}
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
