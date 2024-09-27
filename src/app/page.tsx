import { redirect } from 'next/navigation';
import { getStaffToken, getExpertToken, getAdminToken } from '../package/cookies/token';
import { cookies } from 'next/headers';

export default async function Page() {
  const staffToken = await getStaffToken(cookies());
  const adminToken = await getAdminToken(cookies());
  const expertToken = await getExpertToken(cookies());

  if (staffToken !== '') {
    redirect('/staff/dashboard');
  }

  if (adminToken !== '') {
    redirect('/admin');
  }

  if (expertToken !== '') {
    redirect('/expert/expert-calendar');
  }

  redirect('/login');
}
