import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from 'store/ProviderWrapper';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminToken, getMentorToken, getSuperAdminToken } from 'package/cookies/token';

export const metadata: Metadata = {
  title: 'Berry - React Material Admin Dashboard Template by CodedThemes',
  description:
    'Start your next React project with Berry admin template. It build with Reactjs, Material-UI, Redux, and Hook for faster web development.'
};

// ==============================|| ROOT LAYOUT ||============================== //

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const header_url = headersList.get('next-url') || '';
  const role_path = header_url.split('/login')[1];

  const adminToken = await getAdminToken(cookies());
  const superAdminToken = await getSuperAdminToken(cookies());
  const mentorToken = await getMentorToken(cookies());

  // if (adminToken !== '' && role_path !== 'admin') {
  //   redirect('/admin');
  // }

  // if (superAdminToken !== '' && role_path !== 'super-admin') {
  //   redirect('/super-admin');
  // }

  // if (mentorToken !== '' && role_path !== 'mentor') {
  //   redirect('/mentor');
  // }

  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
