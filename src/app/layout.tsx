import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from 'store/ProviderWrapper';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getStaffToken, getExpertToken, getAdminToken } from 'package/cookies/token';
import SnackbarProvider from 'layout/snackbar-provider';

export const metadata = {
  title: 'Gotcha Job',
  description: 'Nền tảng website & app cung cấp các dịch vụ cải thiện kỹ năng người dùng trong quá trình họ tham gia ứng tuyển công việc'
};


// ==============================|| ROOT LAYOUT ||============================== //

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const header_url = headersList.get('next-url') || '';
  const role_path = header_url.split('/')[1];

  const staffToken = await getStaffToken(cookies());
  const adminToken = await getAdminToken(cookies());
  const expertToken = await getExpertToken(cookies());

  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
