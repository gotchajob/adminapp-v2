import dynamic from 'next/dynamic';

// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third party
import { Props as ChartProps } from 'react-apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TotalLineChartCardProps {
  bgColor?: string;
  chartData?: ChartProps;
  title: string;
  percentage: string;
  value: number;
}

// ============================|| TOTAL LINE CHART CARD ||============================ //

const TotalLineChartCard = ({ bgColor, chartData, title, percentage, value }: TotalLineChartCardProps) => {
  return (
    <Card>
      <Box sx={{ color: '#fff', bgcolor: bgColor || 'primary.dark' }}>
        <Box sx={{ p: 2.5 }}>
          <Grid container direction="column">
            <Grid item container justifyContent="space-between" alignItems="center">
              {value && (
                <Grid item>
                  <Typography variant="h4" color="inherit">
                    {value}
                  </Typography>
                </Grid>
              )}
              {percentage && (
                <Grid item>
                  <Typography variant="body2" color="inherit">
                    {percentage}
                  </Typography>
                </Grid>
              )}
            </Grid>
            {title && (
              <Grid item>
                <Typography variant="body2" color="inherit">
                  {title}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
        {chartData && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type={chartData.options?.chart?.type as ChartProps['type']}
            height={chartData.options?.chart?.height}
          />
        )}
      </Box>
    </Card>
  );
};

export default TotalLineChartCard;
