'use client';

import { useEffect, useState } from 'react';

// material-ui

// project imports
import EarningCard from 'components/dashboard/Default/EarningCard';
import PopularCard from 'components/dashboard/Default/PopularCard';
import TotalOrderLineChartCard from 'components/dashboard/Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from 'ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from 'components/dashboard/Default/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import Grid from '@mui/material/Grid';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>

    </Grid>
  );
};

export default Dashboard;


