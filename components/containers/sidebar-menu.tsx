'use client';

import {
  BookmarkIcon,
  CircleStackIcon,
  DocumentDuplicateIcon,
  InboxStackIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const iconClasses = 'h-6 w-6';
// const submenuIconClasses = 'h-5 w-5';

type Path = {
  type: 'path';
  path: `/${string}`;
  icon: React.ReactNode;
  name: string;
};
type SubPath = {
  type: 'subpath';
  icon: React.ReactNode;
  name: string;
  submenu: (Path | SubPath)[];
};

const routes: (Path | SubPath)[] = [
  {
    type: 'path',
    path: '/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    type: 'path',
    path: '/projects',
    icon: <InboxStackIcon className={iconClasses} />,
    name: 'Projects',
  },
  {
    type: 'path',
    path: '/components',
    icon: <CircleStackIcon className={iconClasses} />,
    name: 'Components',
  },
  {
    type: 'path',
    path: '/templates',
    icon: <DocumentDuplicateIcon className={iconClasses} />,
    name: 'Templates',
  },
  {
    type: 'path',
    path: '/pages',
    icon: <BookmarkIcon className={iconClasses} />,
    name: 'Pages',
  },
  // {
  //   type: 'path',
  //   path: '/app/charts',
  //   icon: <ChartBarIcon className={iconClasses} />,
  //   name: 'Analytics',
  // },
  // {
  //   type: 'path',
  //   path: '/app/integration',
  //   icon: <BoltIcon className={iconClasses} />,
  //   name: 'Integration',
  // },
  // {
  //   type: 'path',
  //   path: '/app/calendar',
  //   icon: <CalendarDaysIcon className={iconClasses} />,
  //   name: 'Calendar',
  // },

  // {
  //   type: 'subpath',
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />,
  //   name: 'Pages',
  //   submenu: [
  //     {
  //       type: 'path',
  //       path: '/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: 'Login',
  //     },
  //     {
  //       type: 'path',
  //       path: '/register', //url
  //       icon: <UserIcon className={submenuIconClasses} />,
  //       name: 'Register',
  //     },
  //     {
  //       type: 'path',
  //       path: '/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses} />,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       type: 'path',
  //       path: '/app/blank',
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: 'Blank Page',
  //     },
  //     {
  //       type: 'path',
  //       path: '/app/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: '404',
  //     },
  //   ],
  // },
  // {
  //   type: 'subpath',
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
  //   name: 'Settings',
  //   submenu: [
  //     {
  //       type: 'path',
  //       path: '/app/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses} />,
  //       name: 'Profile',
  //     },
  //     {
  //       type: 'path',
  //       path: '/app/settings-billing',
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: 'Billing',
  //     },
  //     {
  //       type: 'path',
  //       path: '/app/settings-team',
  //       icon: <UsersIcon className={submenuIconClasses} />,
  //       name: 'Team Members',
  //     },
  //   ],
  // },
  // {
  //   type: 'subpath',
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />,
  //   name: 'Documentation',
  //   submenu: [
  //     {
  //       type: 'path',
  //       path: '/app/getting-started',
  //       icon: <DocumentTextIcon className={submenuIconClasses} />,
  //       name: 'Getting Started',
  //     },
  //     {
  //       type: 'path',
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: 'Features',
  //     },
  //     {
  //       type: 'path',
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: 'Components',
  //     },
  //   ],
  // },
];

function MenuItem({
  pathname,
  route,
}: {
  pathname: string;
  route: Path | SubPath;
}) {
  const isActive =
    route.type === 'path' ? pathname.startsWith(route.path) : false;
  return (
    <li>
      {route.type === 'path' ? (
        <Link
          href={route.path}
          className={clsx({
            'bg-base-200 font-semibold': isActive,
            'font-normal': !isActive,
          })}
          prefetch={false}
        >
          {route.icon} {route.name}
          {isActive && (
            <span
              className="absolute inset-y-0 left-0 w-1 rounded-br-md rounded-tr-md bg-primary "
              aria-hidden="true"
            ></span>
          )}
        </Link>
      ) : (
        <details>
          <summary>
            {route.icon} {route.name}
          </summary>
          <ul>
            {route.submenu.map(subroute => (
              <MenuItem
                key={subroute.name}
                pathname={pathname}
                route={subroute}
              />
            ))}
          </ul>
        </details>
      )}
    </li>
  );
}

export default function SidebarMenu() {
  const pathname = usePathname();
  return (
    <>
      {routes.map(route => (
        <MenuItem key={route.name} pathname={pathname || ''} route={route} />
      ))}
    </>
  );
}
