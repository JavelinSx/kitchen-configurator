'use client';

import { ReactNode } from 'react';

export function ClientProvider({ children }: { children: ReactNode }) {
  return <main className='relative h-screen w-full'>{children}</main>;
}
