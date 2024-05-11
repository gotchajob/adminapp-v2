import Box from '@mui/material/Box';
import { CVComponent } from './interface';
import Typography from '@mui/material/Typography';
import Iconify from 'components/iconify/iconify';

export const HeaderComponent = ({ component }: { component: CVComponent }) => {
  return (
    <Box justifyContent={'center'} alignItems={'center'} display={'flex'} py={2}>
      <Typography sx={{ width: '100%' }} variant="h5">
        <Iconify icon="ic:baseline-email" width={24} />
        {component.header}
      </Typography>
    </Box>
  );
};
