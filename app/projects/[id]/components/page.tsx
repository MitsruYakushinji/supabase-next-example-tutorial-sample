import {Metadata} from 'next';
import Image from 'next/image';

import TitleCard from 'components/cards/title';
import {Tags} from 'components/tags';
import {getServerClient} from 'lib/server-client';
import {getThumbnailPath} from 'lib/thumbnail';

import AddButton from './add';
import BackButton from './back';
import RemoveButton from './remove';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PROJECTS | BASE',
};

export default async function ProjectComponents({
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
      'id, name, has_image, description, projects!inner(name), tags(id, name, color)'
    )
    .eq('projects.id', id);
  if (components.error) {
    console.error(components.error);
  }
  const componentsData = components.data;

  if (!componentsData) {
    console.error(components.error);
    return null;
  }
  const project = await supabase
    .from('projects')
    .select('name')
    .eq('id', id)
    .single();
  const projectData = project.data;
  if (!projectData) {
    console.error(project.error);
    return null;
  }

  const getThumbnail = (id: string) => getThumbnailPath(supabase, id);

  return (
    <TitleCard
      title={`${projectData.name} - Components`}
      topMargin="mt-2"
      TopSideButtons={
        <>
          <BackButton />
          <AddButton projectId={id} />
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
                <td>
                  <RemoveButton projectId={id} componentId={component.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}
