import {
  CircleStackIcon,
  DocumentDuplicateIcon,
  InboxStackIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {Metadata} from 'next';
import type {ComponentProps} from 'react';

import {getServerClient} from 'lib/server-client';

import {Stats} from './stats';
import {
  getComponentStats,
  getProjectStats,
  getTemplateStats,
  getUserStats,
} from './utils';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'DASHABOARD | BASE',
};

export default async function Dashboard() {
  const supabase = getServerClient();
  const [projects, users, components, templates] = await Promise.all([
    getProjectStats(supabase),
    getUserStats(supabase),
    getComponentStats(supabase),
    getTemplateStats(supabase),
  ]);
  const statsData: ComponentProps<typeof Stats>[] = [
    {
      title: 'Projects',
      value: `${projects.value}`,
      icon: <InboxStackIcon className="h-8 w-8" />,
      description: projects.description,
    },
    {
      title: 'Components',
      value: `${components.value}`,
      icon: <CircleStackIcon className="h-8 w-8" />,
      description: '',
    },
    {
      title: 'Templates',
      value: `${templates.value}`,
      icon: <DocumentDuplicateIcon className="h-8 w-8" />,
      description: '',
    },
    {
      title: 'Users',
      value: `${users.value}`,
      icon: <UsersIcon className="h-8 w-8" />,
      description: users.description,
    },
  ];
  return (
    <>
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map(d => {
          return <Stats key={d.title} {...d} />;
        })}
      </div>
    </>
  );
}
