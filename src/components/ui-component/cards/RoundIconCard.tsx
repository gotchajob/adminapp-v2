// material-ui
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from './MainCard';

// types
import { GenericCardProps } from 'types';

// ============================|| ROUND ICON CARD ||============================ //

interface Props {
  primary: string;
  secondary: string;
  content: string;
  iconPrimary: GenericCardProps['iconPrimary'];
  color: string;
  bgcolor: string;
}

const RoundIconCard = ({ primary, secondary, content, iconPrimary, color, bgcolor }: Props) => {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <MainCard>
      <Grid container alignItems="center" spacing={0} justifyContent="space-between">
        <Grid item>
          <Stack spacing={1}>
            <Typography variant="h5" color="inherit">
              {primary}
            </Typography>
            <Typography variant="h4">{secondary}</Typography>
            <Typography variant="subtitle2" color="inherit">
              {content}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <IconButton sx={{ bgcolor, color, '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }} size="large" aria-label="view icon">
            {primaryIcon}
          </IconButton>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RoundIconCard;
