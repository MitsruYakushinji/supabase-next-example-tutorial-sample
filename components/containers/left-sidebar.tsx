import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Image from 'next/image';
import Link from 'next/link';

import SidebarMenu from './sidebar-menu';

export default function LeftSidebar() {
  return (
    <div className="drawer-side z-10">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu menu-md h-full w-80 flex-nowrap bg-base-100 px-0 text-base-content">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-circle btn-ghost absolute right-0 top-0 z-50 mr-2 mt-4 bg-base-300 lg:hidden"
        >
          <XMarkIcon className="inline-block h-5 w-5" />
        </label>

        <li className="mb-2 font-semibold">
          <Link href="/" className="text-2xl">
            <Image
              className="mask mask-squircle w-10"
              src="/logo.svg"
              alt="DashWind Logo"
              width={40}
              height={40}
            />
            BASE
          </Link>
        </li>
        <SidebarMenu />
      </ul>
    </div>
  );
}
