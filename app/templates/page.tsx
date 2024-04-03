import {Metadata} from 'next';

import TitleCard from 'components/cards/title';
import {getServerClient} from 'lib/server-client';

import Item from './item';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'TEMPLATES | BASE',
};

export default async function Templates() {
  const supabase = getServerClient();

  /**
   * テンプレートデータ
   */
  const templates = await supabase.from('templates').select('*');
  if (templates.error) {
    console.error(templates.error);
  }
  const templatesData = templates.data || [];

  return (
    <TitleCard title="" topMargin="mt-2">
      {/* Leads List in table format loaded from slice after api call */}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {templatesData.map(template => (
              <Item key={template.id} {...template} />
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}
