// PROJECT IMPORTS
import DashboardLayout from 'layout/MainLayout-expert';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getExpertToken } from 'package/cookies/token';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default async function Layout({ children }: { children: React.ReactNode }) {
  const expertToken = await getExpertToken(cookies())
  if (expertToken === "") {
    redirect("/login")
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
