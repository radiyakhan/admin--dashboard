// src/components/SidebarWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

const SidebarWrapper = () => {
  const pathname = usePathname();

  // Only render Sidebar if the pathname is not '/admin/login'
  if (pathname === '/login') {
    return null;
  }

  return <Sidebar />;
};

export default SidebarWrapper;
