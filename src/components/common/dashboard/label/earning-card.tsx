'use client';

import React from 'react';
import Image from 'next/image';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { shadeColor } from 'package/util/shade-color';

const EarningIcon = '/assets/images/icons/earning.svg';

// types
import { ThemeMode } from 'types/config';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

interface EarningCardProps {
  data: EarningCardData;
}

interface EarningCardData {
  bgcolor: string;
  mainTitle: string;
  subTitle: string;
}

const EarningCard = ({  data }: EarningCardProps) => {
  const theme = useTheme();

  const { bgcolor, mainTitle, subTitle } = data;

  return (
    <MainCard
      border={false}
      content={false}
      sx={{
        bgcolor: `${shadeColor(bgcolor, 15)}`,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background:
            theme.palette.mode === ThemeMode.DARK
              ? `linear-gradient(210.04deg, ${bgcolor} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
              : `${bgcolor}`,
          borderRadius: '50%',
          top: { xs: -105, sm: -85 },
          right: { xs: -140, sm: -95 }
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background:
            theme.palette.mode === ThemeMode.DARK
              ? `linear-gradient(140.9deg, ${shadeColor(bgcolor, -10)} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
              : `${shadeColor(bgcolor, -5)}`,
          borderRadius: '50%',
          top: { xs: -155, sm: -125 },
          right: { xs: -70, sm: -15 },
          opacity: 0.5
        }
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.largeAvatar,
                bgcolor,
                mt: 1
              }}
            >
              <Image src={EarningIcon} height={30} width={30} alt="Notification" style={{ maxWidth: '100%', height: 'auto' }} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 20, fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{mainTitle}</Typography>
          </Grid>
          <Grid item sx={{ mb: 1.25 }}>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                color: '#fff'
              }}
            >
              {subTitle}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default EarningCard;
