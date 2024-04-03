'use client';

import {Auth} from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {getComponentClient} from 'lib/component-client';

const views = [
  {id: 'sign_in', message: 'Sign in today for stuff'},
  {id: 'sign_up', message: 'Register today for stuff'},
] satisfies {
  id: 'sign_in' | 'sign_up';
  message: string;
}[];

export default function AuthComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  const supabase = getComponentClient();
  const [view, setView] = useState(views[0]);
  const router = useRouter();

  useEffect(() => {
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        router.refresh();
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  return (
    <div className="flex min-h-screen items-center bg-base-200">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
          {children}
          <div className="px-10 py-24">
            <h2 className="mb-2 text-center text-2xl font-semibold">
              {view.id === 'sign_in' ? 'Login' : 'Register'}
            </h2>
            <p className="text-center">{view.message}</p>
            <Auth
              supabaseClient={supabase}
              redirectTo={`${window.location.origin}/auth`}
              showLinks={false}
              view={view.id}
              appearance={{
                theme: ThemeSupa,
                className: {button: 'btn'},
              }}
              providers={view.id === 'sign_in' ? [] : []}
            />

            <div className="mt-4 text-center">
              {view.id === 'sign_in' ? (
                <>
                  Don&rsquo;t have an account yet?{' '}
                  <button
                    className="link link-primary"
                    onClick={() => setView(views[1])}
                    onKeyDown={() => setView(views[1])}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    className="link link-primary"
                    onClick={() => setView(views[0])}
                    onKeyDown={() => setView(views[0])}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
