'use client';

import {useResultNotification} from 'lib/features/notification/hooks';

import {updatePassword, updateUsername} from './update-actions';

export function UsernameForm({children}: {children: React.ReactNode}) {
  const notifyResult = useResultNotification();
  async function updateUsernameForm(e: FormData) {
    const {result, error} = await updateUsername(e);
    notifyResult(result, 'Username updated', error || 'Username update failed');
  }
  return <form action={updateUsernameForm}>{children}</form>;
}

export function PasswordForm({children}: {children: React.ReactNode}) {
  const notifyResult = useResultNotification();
  async function updatePasswordForm(e: FormData) {
    const {result, error} = await updatePassword(e);
    notifyResult(result, 'Password updated', error || 'Password update failed');
  }
  return <form action={updatePasswordForm}>{children}</form>;
}
