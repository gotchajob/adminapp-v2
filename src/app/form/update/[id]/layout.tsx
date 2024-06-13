import { useCheckRequestUrl } from 'hooks/use-check-request-url';
import { redirect, useRouter } from 'next/navigation';
import { ExpertRegisterCheckUrl } from 'package/api/expert-register-request/id/check-url';
import { ReactNode, useEffect } from 'react';
import CircularLoader from 'ui-component/CircularLoader';

export default async function Layout({ params, children }: { params: { id: string }; children: ReactNode }) {
  const [email, id] = params.id.split('-');
  const data = await ExpertRegisterCheckUrl({ id });
  if (data.status === 'error') {
    return <></>;
  }
  return <>{children}</>;
}
