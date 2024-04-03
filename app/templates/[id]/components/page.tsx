import {Metadata} from 'next';
import Image from 'next/image';

import TitleCard from 'components/cards/title';
import {Tags} from 'components/tags';
import {getServerClient} from 'lib/server-client';
import {getThumbnailPath} from 'lib/thumbnail';

import BackButton from './back';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'TEMPLATES | BASE',
};

export default async function TemplateComponents({
  params: {id},
}: {
  params: {id: string};
}) {
  const supabase = getServerClient();

  /**
   * コンポーネントデータ
   */
  const components = await supabase
    .from('components')
    .select(
      'id, name, has_image, description, templates!inner(name), tags(id, name, color)'
    )
    .eq('templates.id', id);
  if (components.error) {
    console.error(components.error);
  }
  const componentsData = components.data;

  if (!componentsData) {
    console.error(components.error);
    return null;
  }
  const template = await supabase
    .from('templates')
    .select('name')
    .eq('id', id)
    .single();
  const templateData = template.data;
  if (!templateData) {
    console.error(template.error);
    return null;
  }

  const getThumbnail = (id: string) => getThumbnailPath(supabase, id);

  return (
    <TitleCard
      title={`${templateData.name} - Components`}
      topMargin="mt-2"
      TopSideButtons={
        <>
          <BackButton />
          {/* 一旦動線を塞ぐのでコメントアウト */}
          {/* <AddButton templateId={id} /> */}
        </>
      }
    >
      {/* Leads List in table format loaded from slice after api call */}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Tag</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {componentsData.map(component => (
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
                <td>{component.description}</td>
                <td>
                  <Tags tags={component.tags} disableClick />
                </td>
                <td>{/* TODO: remove button */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}
