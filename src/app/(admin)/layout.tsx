// PROJECT IMPORTS
import DashboardLayout from 'layout/MainLayout_plk';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminToken } from 'package/cookies/token';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default async function Layout({ children }: { children: React.ReactNode }) {
  const adminToken = await getAdminToken(cookies())
  if (adminToken === "") {
    redirect("/login")
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
