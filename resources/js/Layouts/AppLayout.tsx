import { Head } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

import * as Avatar from '@radix-ui/react-avatar';

interface AppLayoutProps {
  title: string;
}

export function AppLayout({
  title,
  children,
}: PropsWithChildren<AppLayoutProps>) {
  return (
    <div className="h-screen flex flex-col bg-dark-green-800 font-sans">
      <Head title={title} />

      <div className="border-b border-dark-green-400">
        <div className="max-w-7xl mx-auto flex items-center w-full px-6 xl:px-0 py-4 justify-between">
          <p className="text-white font-serif font-bold text-xl">Inventax</p>

          <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden rounded-lg w-10 h-10 bg-dark-green-400">
            <Avatar.Image
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="Colm Tuite"
            />
            <Avatar.Fallback
              className="w-full h-full flex items-center justify-center bg-white text-sm font-medium"
              delayMs={600}
            >
              CT
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>

      <main className="h-full w-full flex-grow max-w-7xl px-6 xl:px-0 mx-auto flex flex-col">
        {children}
      </main>
    </div>
  );
}
