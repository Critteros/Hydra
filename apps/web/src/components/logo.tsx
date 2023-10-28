import Image from 'next/image';

import { Typography } from './ui/typography';

export function Logo() {
  return (
    <span className="flex flex-row gap-2 items-end">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} className="dark:invert" />
      <Typography variant="h3" as="p" className="text-3xl">
        Hydra
      </Typography>
    </span>
  );
}
