'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import { Props as ChartProps } from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// types
import { ThemeMode } from 'types/config';
import { formatNumber } from 'lib/utils/number';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

export interface DonutChartProps {
  series: number[];
  stack?: boolean;
  colors?: string[];
  labels: string[];
}

export const DonutChart = ({
  donutChartProps,
  mainTitle,
  subTitle,
  height = 400
}: {
  height?: number;
  donutChartProps: DonutChartProps;
  mainTitle?: string;
  subTitle?: string;
}) => {
  const chartData: ChartProps = {
    series: donutChartProps.series,
    options: {
      colors: donutChartProps.colors,
      labels: donutChartProps.labels,
      legend: {
        show: true,
        position: 'bottom',
        fontFamily: 'inherit',
        labels: {
          colors: 'inherit'
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      chart: {
        stacked: !!donutChartProps.stack,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${formatNumber(val)}`
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: false,
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false
        }
      }
    }
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} textAlign={'center'}>
          <Typography variant="h4">{mainTitle}</Typography>
          <Typography variant="subtitle2">{subTitle}</Typography>
        </Grid>
        <Grid item xs={12}>
          <ReactApexChart type="donut" options={chartData.options} series={chartData.series} height={height} />
        </Grid>
      </Grid>
    </MainCard>
  );
};
