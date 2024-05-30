import Box from '@mui/material/Box';
import { CVComponent, PersonalComponent } from './interface';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { EnchantInput } from 'components/common/enchant-input';

export const HeaderComponent = ({ component }: { component: CVComponent }) => {
  return (
    <Stack py={2} direction={'column'} spacing={1.5}>
      <Typography variant="h3" sx={{ color: component.color }}>
        {component.header}
      </Typography>
      <Divider />
      <Box mt={'0px !important'}>
        <EnchantInput
          initValue={component.description}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </Box>
    </Stack>
  );
};
