import { redirect } from 'next/navigation';
import { getAdminToken, getMentorToken, getSuperAdminToken } from '../package/cookies/token';
import { cookies } from 'next/headers';

export default async function Page() {
  const adminToken = await getAdminToken(cookies());
  const superAdminToken = await getSuperAdminToken(cookies());
  const mentorToken = await getMentorToken(cookies());

  if (adminToken == "") {
    redirect('/login');
  }

  if (adminToken !== '') {
    redirect('/admin/dashboard');
  }

  if (superAdminToken !== '') {
    redirect('/super-admin');
  }

  if (mentorToken !== '') {
    redirect('/mentor');
  }

  redirect('/login');
}
