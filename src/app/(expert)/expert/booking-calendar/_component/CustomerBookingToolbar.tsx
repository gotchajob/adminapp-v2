'use client';

import { useEffect, useState } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid, { GridProps } from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { format } from 'date-fns';

// assets
import { IconChevronLeft, IconChevronRight, IconLayoutGrid, IconTemplate, IconLayoutList, IconListNumbers } from '@tabler/icons-react';
import { Autocomplete, Chip, TextField } from '@mui/material';

// constant
const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: IconLayoutGrid
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: IconTemplate
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: IconLayoutList
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: IconListNumbers
  }
];

// Skills Expert
const skillsExpert = [
  { label: 'C++', id: 1 },
  { label: 'C#', id: 2 },
  { label: 'Java', id: 3 },
  { label: 'ReactJS', id: 4 },
  { label: 'React Native', id: 5 },
  { label: 'Flutter', id: 6 },
  { label: 'VueJS', id: 7 }
];

// ==============================|| CALENDAR TOOLBAR ||============================== //

interface ToolbarProps {
  date: number | Date;
  view: string;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  onChangeView: (s: string) => void;
  sx?: GridProps['sx'];
}

const CustomerToolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, sx, ...others }: ToolbarProps) => {
  const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [newViewOption, setNewViewOption] = useState(viewOptions);

  useEffect(() => {
    let newOption = viewOptions;
    if (matchSm) {
      newOption = viewOptions.filter((options) => options.value !== 'dayGridMonth' && options.value !== 'timeGridWeek');
    }
    setNewViewOption(newOption);
  }, [matchSm]);

  return (
    <Grid container alignItems="center" justifyContent="space-evenly" spacing={1} {...others} sx={{ pb: 3 }}>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={onClickToday}>
          Tháng này
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton onClick={onClickPrev} size="large" aria-label="prev">
            <IconChevronLeft />
          </IconButton>
          <Typography variant="h3" color="textPrimary">
            {format(date, 'MMMM yyyy')}
          </Typography>
          <IconButton onClick={onClickNext} size="large" aria-label="next">
            <IconChevronRight />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
  );
};

export default CustomerToolbar;
