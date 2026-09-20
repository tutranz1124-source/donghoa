import React from 'react';
import ClientHomePage from '@/components/ClientHomePage';
import { getSiteContent } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const content = getSiteContent();
  return <ClientHomePage initialContent={content} />;
}

