// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
const visa = '/assets/images/e-commerce/visa.png';
const mastercard = '/assets/images/e-commerce/mastercard.png';
import CheckIcon from '@mui/icons-material/Check';

// ==============================|| CHECKOUT PAYMENT - CARD METHOD ||============================== //

interface PaymentCardProps {
  type: string;
  cards: string;
  cardHandler: (card: string) => void;
}

const PaymentCard = ({ type, cards, cardHandler }: PaymentCardProps) => {
  const theme = useTheme();
  const card = type === 'visa' ? visa : mastercard;
  const visaShadow = type === 'visa' ? theme.customShadows.secondary : theme.customShadows.primary;
  const visaBorder = type === 'visa' ? 'secondary.dark' : 'primary.dark';

  return (
    <SubCard
      content={false}
      sx={{
        bgcolor: type === 'visa' ? 'secondary.main' : 'primary.main',
        border: '2px solid',
        borderColor: cards === type ? 'grey.900' : visaBorder,
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 380,
        boxShadow: cards === type ? visaShadow : 'none',
        '&:hover': {
          boxShadow: cards === type ? visaShadow : 'none'
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          bgcolor: type === 'visa' ? 'secondary.800' : 'primary.800',
          width: 60,
          height: 60,
          borderRadius: '50%',
          right: 12,
          bottom: -30
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          bgcolor: type === 'visa' ? 'secondary.dark' : 'primary.dark',
          width: 60,
          height: 60,
          borderRadius: '50%',
          right: -20,
          bottom: 0
        }
      }}
    >
      <Stack
        spacing={1}
        sx={{
          p: 2,
          color: type === 'visa' ? 'secondary.light' : 'primary.light',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bgcolor: type === 'visa' ? 'secondary.dark' : 'primary.dark',
            width: 75,
            height: 75,
            borderRadius: '50%',
            top: -25,
            left: -25
          }
        }}
        onClick={() => cardHandler(type)}
      >
        <Stack direction="row" alignItems="flex-start" sx={{ height: 40 }} justifyContent={cards === type ? 'space-between' : 'flex-end'}>
          {cards === type && <CheckIcon sx={{ zIndex: 1, mt: -0.625, ml: -0.625 }} />}
          <Box
            sx={{
              backgroundImage: `url(${card})`,
              backgroundSize: 'contain',
              backgroundPosition: 'right',
              width: 48,
              height: type === 'visa' ? 16 : 36.5
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" color="inherit">
            ****
          </Typography>
          <Typography variant="h4" color="inherit">
            ****
          </Typography>
          <Typography variant="h4" color="inherit">
            ****
          </Typography>
          <Typography variant="h4" color="inherit">
            2599
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={gridSpacing}>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.6 }}>
              Expire Date
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.6 }}>
              05/24
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.6 }}>
              CVV
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.6 }}>
              085
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </SubCard>
  );
};

export default PaymentCard;
