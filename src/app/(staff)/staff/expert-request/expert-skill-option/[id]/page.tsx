'use client';

// material-ui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// assets
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import { GetExpertSkillOption, ExpertSkillOption } from 'package/api/expert-skill-option';
import { useEffect, useState } from 'react';
import { useGetSearchParams } from 'hooks/use-get-params';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';

const logo = '/assets/images/logo/logo.png';

const ExpertSkillOptionPage = ({ params }: { params: { id: number } }) => {
  const { ExperSkillOptions: data } = useGetExpertSkillOptions({ expertId: params.id });

  const handleChangePoint = async (e: any) => {};

  return (
    <MainCard>
      {data?.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ my: 2 }}>
          <Grid item lg={3}>
            <TextField name="skillname" label="Kỹ năng" value={item.skillOptionName} fullWidth disabled />
          </Grid>
          <Grid item lg={3}>
            {' '}
            <TextField name="score" label="Điểm" value={item.defaultPoint} fullWidth onChange={handleChangePoint} sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={6}>
            <TextField name="certificate" label="Chứng chỉ" value={item.certificate} fullWidth disabled />
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Grid item lg={3}></Grid>
        <Grid item lg={3}>
          <Button variant="contained" sx={{ height: 45 }}>
            Cập nhật điểm
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ExpertSkillOptionPage;
