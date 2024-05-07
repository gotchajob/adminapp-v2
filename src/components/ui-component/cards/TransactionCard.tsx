// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import Image from 'next/image';
import { ThemeMode } from 'types/config';

const TransactionIcon = '/assets/images/icons/shopping-cart-svgrepo-com.svg';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: "#C4F4FE",
  color: theme.palette.primary.dark,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    // background:
    //   theme.palette.mode === ThemeMode.DARK
    //     ? `linear-gradient(210.04deg, ${theme.palette.primary.light} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
    //     : theme.palette.primary.dark,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    // background:
    //   theme.palette.mode === ThemeMode.DARK
    //     ? `linear-gradient(140.9deg, ${theme.palette.primary.light} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
    //     : theme.palette.primary.dark,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

interface TransactionCardProps {
  isLoading: boolean;
}

const TransactionCard = ({ isLoading }: TransactionCardProps) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: '#fff',
                      color: theme.palette.primary.dark
                    }}
                  >
                    <Image src={TransactionIcon} height={30} width={30} alt="Notification" style={{ maxWidth: '100%', height: 'auto' }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>
                      5
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: theme.palette.primary.dark
                    }}>
                      Transactions
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TransactionCard;
