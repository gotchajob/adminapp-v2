'use client';

import { useCheckRequestUrl } from 'hooks/use-check-request-url';
import { redirect, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import CircularLoader from 'ui-component/CircularLoader';

export default function Layout({ params, children }: { params: { id: string }; children: ReactNode }) {
  const [email, id] = params.id.split('-');
  const { isLoading, isValid } = useCheckRequestUrl({ id });
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isValid) {
      router.push('/not-found');
    }
  }, [isValid, isLoading]);
  return (
    <>
      {isLoading ? <CircularLoader /> : null}
      {!isLoading && isValid ? <>{children}</> : null}
    </>
  );

}
