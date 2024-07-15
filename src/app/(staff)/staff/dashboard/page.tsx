"use client";

import { useEffect, useState } from "react";

// material-ui

// project imports
import { gridSpacing } from "store/constant";
import NewUserLineChartCard from "components/dashboard/Default/NewUserLineChartCard";
import PopularCard from "components/dashboard/Default/PopularCard";
import TotalUserBarChart from "components/dashboard/Default/TotalUserBarChart";
import TotalUserCard from "components/dashboard/Default/TotalUserCard";
import TotalAccessBarChart from "components/dashboard/Default/TotalAccessBarChart";
import LatestTransactionTableCard from "components/dashboard/Analytics/LatestTransactionTableCard";
import TotalRevenueCard2 from "components/dashboard/Analytics/TotalRevenueCard2";
import TotalOrderLineChartCard from "components/dashboard/Default/TotalOrderLineChartCard";
import TotalRevenueBarChart from "components/dashboard/Default/TotalRevenueBarChart";
import TotalTransactionBarChart from "components/dashboard/Default/TotalTransactionBarChart";
import TotalAccessCard from "ui-component/cards/TotalAccessCard";
import TotalAdviseCard from "ui-component/cards/TotalAdviseCard";
import RevenueCard2 from "ui-component/cards/RevenueCard2";
import TotalRevenueCard from "ui-component/cards/TotalRevenueCard";
import TotalTransactionCard from "ui-component/cards/TotalTransactionCard";
import TransactionCard from "ui-component/cards/TransactionCard";

// assets
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import Grid from "@mui/material/Grid";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalUserCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NewUserLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <TotalAccessCard isLoading={isLoading} />
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <TotalAdviseCard
                  {...{
                    isLoading: isLoading,
                    total: 1,
                    label: "Total Advise",
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} xs={12} md={8}>
            <TotalUserBarChart isLoading={isLoading} />
          </Grid>
          <Grid item lg={8} xs={12} md={8}>
            <TotalAccessBarChart isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <TransactionCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <RevenueCard2 isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <TotalTransactionCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <TotalRevenueCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={8} xs={12}>
            <TotalTransactionBarChart
              isLoading={isLoading}
            ></TotalTransactionBarChart>
          </Grid>
          <Grid item lg={4} md={8} xs={12}>
            <LatestTransactionTableCard></LatestTransactionTableCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={8} xs={12}>
            <TotalRevenueBarChart isLoading={isLoading}></TotalRevenueBarChart>
          </Grid>
          <Grid item lg={4} md={8} xs={12}>
            <TotalRevenueCard2></TotalRevenueCard2>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
