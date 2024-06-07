// PROJECT IMPORTS
import DashboardLayout from 'layout/MainLayout_plk';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getStaffToken } from 'package/cookies/token';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default async function Layout({ children }: { children: React.ReactNode }) {
  const staffToken = await getStaffToken(cookies())
  if (staffToken === "") {
    redirect("/login")
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
