import 'server-only';

import { Typography } from '@/components/ui/typography';

export function UserReadFallback() {
  return (
    <main className="flex w-full grow flex-col items-center">
      <Typography variant="h1" className="mb-4 self-start">
        Users
      </Typography>
      <Typography variant="h1" as="h2" className="my-auto self-center">
        You do not have permissions to view this page
      </Typography>
    </main>
  );
}
