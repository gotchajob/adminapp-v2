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
import { formatNumber } from 'package/util';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

export interface BarChartProps {
  series: BarChartSeries[];
  categories: string[];
  stack?: boolean;
  colors?: string[];
}

interface BarChartSeries {
  name: string;
  type: 'bar' | 'line';
  data: number[];
}

export const BarChart = ({
  barChartProps,
  mainTitle,
  subTitle,
  height = 600
}: {
  height?: number;
  barChartProps: BarChartProps;
  mainTitle?: string;
  subTitle?: string;
}) => {
  const chartData: ChartProps = {
    series: [...barChartProps.series],
    type: 'bar',
    options: {
      colors: barChartProps.colors,
      chart: {
        stacked: !!barChartProps.stack,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      xaxis: {
        type: 'category',
        categories: [...barChartProps.categories]
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `${formatNumber(val)}`
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: false,
          columnWidth: '50%'
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
          <ReactApexChart options={chartData.options} series={chartData.series} height={height} />
        </Grid>
      </Grid>
    </MainCard>
  );
};
