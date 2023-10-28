import 'server-only';

import { Logo } from '@/components/logo';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Typography } from '@/components/ui/typography';

export default function LoginPage() {
  return (
    <main className="self-center my-auto">
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      <div className="absolute left-2 top-2">
        <Logo />
      </div>
      <Typography>Login Page</Typography>
    </main>
  );
}
