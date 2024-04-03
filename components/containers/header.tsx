'use client';

import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {themeChange} from 'theme-change';

import {getComponentClient} from 'lib/component-client';

import {
  quickPanelState,
  todayQuickPanelState,
} from '../../lib/features/quick-panel';

export default function Header() {
  const noOfNotifications = 0;
  const pageTitle = '';

  const [currentTheme, setCurrentTheme] = useState('corporate');

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
    setCurrentTheme(localStorage.getItem('theme') || 'corporate');
  }, []);

  /**
   * Opening right sidebar for notification
   */
  const setQuickPanel = useSetRecoilState(quickPanelState);
  const openNotification = () => {
    setQuickPanel(todayQuickPanelState());
  };

  const supabase = getComponentClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  return (
    <div className="navbar z-10 flex justify-between bg-base-100 shadow-md">
      {/* Menu toogle for mobile view or small screen */}
      <div className="">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <Bars3Icon className="inline-block h-5 w-5" />
        </label>
        <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="order-last">
        {/* Light and dark theme selection toogle **/}
        <label className="swap">
          <input id="theme-color" type="checkbox" />
          <SunIcon
            data-set-theme="corporate"
            data-act-class="ACTIVECLASS"
            className={clsx('h-6 w-6 fill-current', {
              'swap-on': currentTheme !== 'corporate',
              'swap-off': currentTheme === 'corporate',
            })}
          />
          <MoonIcon
            data-set-theme="business"
            data-act-class="ACTIVECLASS"
            className={clsx('h-6 w-6 fill-current', {
              'swap-on': currentTheme !== 'business',
              'swap-off': currentTheme === 'business',
            })}
          />
        </label>

        {/* Notification icon */}
        <button
          className="btn btn-circle btn-ghost  ml-4"
          onClick={() => openNotification()}
        >
          <div className="indicator">
            <BellIcon className="h-6 w-6" />
            {noOfNotifications > 0 ? (
              <span className="badge indicator-item badge-secondary badge-sm">
                {noOfNotifications}
              </span>
            ) : null}
          </div>
        </button>

        {/* Profile icon, opening menu on click */}
        <div className="dropdown dropdown-end ml-4">
          <button
            type="button"
            tabIndex={0}
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <UserCircleIcon />
            </div>
          </button>
          <ul className="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            <li className="justify-between">
              <Link href="/settings/profile">Profile Settings</Link>
            </li>
            <div className="divider mb-0 mt-0"></div>
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
