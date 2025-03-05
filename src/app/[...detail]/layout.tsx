/* COMPONENTS */
import AppHeader from '@/components/ui/app-header';

/* TYPES */
import type { ComponentWithChildrenReq } from '@/types';

export default function RootLayout({ children }: ComponentWithChildrenReq) {
  return <AppHeader>{children}</AppHeader>;
}
