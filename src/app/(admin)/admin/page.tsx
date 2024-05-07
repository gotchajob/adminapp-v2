'use client';
import { AdminToken } from 'hooks/use-login';
import { useEffect } from 'react';
import DefaultDashboard from 'views/dashboard/default';

// ==============================|| PAGE ||============================== //

export default function DefaultDashboardPage() {
  const { adminToken } = AdminToken();
  useEffect(() => {
    console.log(adminToken);
  });
  return <DefaultDashboard />;
}
