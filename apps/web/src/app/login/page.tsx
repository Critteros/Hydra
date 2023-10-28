import ms from 'ms';
import 'server-only';

import { Typography } from '@/components/ui/typography';
import { ClientNavigateBack } from '@/lib/client/client-navigate';
import { checkSession } from '@/lib/server/auth';

import { LoginForm } from './login-form';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const isAuthorized = await checkSession();

  if (isAuthorized) {
    return (
      <div className="mx-auto flex flex-col gap-4 text-center">
        <Typography variant="h1">You are already logged in</Typography>
        <Typography variant="h3" className="text-gray-500">
          you will be redirected shortly
        </Typography>
        <ClientNavigateBack defaultUrl="/" timeout={ms('1.5sec')} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-3/4 max-w-[400px] flex-col justify-center gap-5">
      <div className="flex flex-col space-y-2">
        <Typography variant="h1">Log in</Typography>
      </div>
      <LoginForm />
    </div>
  );
}
