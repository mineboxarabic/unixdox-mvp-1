import React from 'react';
import { signIn, signOut } from '@/auth';

export function AuthButtons({ authenticated }: { authenticated: boolean }) {
  return (
    <div className="flex gap-3">
      {!authenticated && (
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white hover:opacity-90"
          >
            Sign in with Google
          </button>
        </form>
      )}
      {authenticated && (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button
            type="submit"
            className="rounded border px-4 py-2 hover:bg-gray-100"
          >
            Sign out
          </button>
        </form>
      )}
    </div>
  );
}
