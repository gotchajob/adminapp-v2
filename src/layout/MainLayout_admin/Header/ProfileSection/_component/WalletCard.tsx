// material-ui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// types
import { FormattedMessage } from 'react-intl';
import { ThemeMode } from 'types/config';

// Asset
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { CustomerToken, ExpertToken } from 'hooks/use-login';
import { useEffect } from 'react';
import { useGetBalance } from 'hooks/use-get-balance';


// ==============================|| PROFILE MENU - UPGRADE PLAN CARD ||============================== //

const WalletCard = () => {
  const theme = useTheme();

  const { expertToken } = ExpertToken();

  const { balance } = useGetBalance(expertToken);

  const cardSX = {
    content: '""',
    position: 'absolute',
    width: 200,
    height: 200,
    borderColor: '#0782C6'
  };

  return (
    <Card
      sx={{
        bgcolor: theme.palette.primary.light,
        my: 2,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          border: '19px solid ',
          borderRadius: '50%',
          top: '65px',
          right: '-150px',
          ...cardSX
        },
        '&:before': {
          border: '3px solid ',
          borderRadius: '50%',
          top: '145px',
          right: '-70px',
          ...cardSX
        }
      }}
    >
      <CardContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Stack direction={"row"} spacing={20} alignItems="center">
              <Typography variant="h4">Số tiền trong ví</Typography>
              <Tooltip title="Lịch sử giao dịch" placement="top">
                <IconButton size="small" onClick={() => { }} sx={{
                  border: '2px solid #0782C6',
                  borderRadius: '10%',
                  padding: '0.5px',
                  zIndex: 10
                }}>
                  <ArrowOutwardIcon color="primary" sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {balance?.balance} vnđ
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
