import {Metadata} from 'next';

import TitleCard from 'components/cards/title';
import {getUserPermission} from 'lib/permission';
import {getServerClient} from 'lib/server-client';

import Item from './item';
import NewProjectButton from './new-project';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PROJECTS | BASE',
};

export default async function Projects() {
  const supabase = getServerClient();

  const permission = await getUserPermission(supabase);
  /**
   * プロジェクトデータ
   */
  const projects = await supabase.from('projects').select('*');
  if (projects.error) {
    console.error(projects.error);
  }
  const projectsData = projects.data || [];

  return (
    <TitleCard
      title=""
      topMargin="mt-2"
      TopSideButtons={permission.create && <NewProjectButton />}
    >
      {/* Leads List in table format loaded from slice after api call */}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map(project => {
              return <Item key={project.id} {...project} />;
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}
