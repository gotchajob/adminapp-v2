import Box from '@mui/material/Box';
import { CVComponent, PersonalComponent } from './interface';
import Typography from '@mui/material/Typography';
import Iconify from 'components/iconify/iconify';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});
export const InformationComponent = ({ component, information }: { component: CVComponent; information: PersonalComponent[] }) => {
  return (
    <Stack py={2} direction={'column'} spacing={1.5}>
      <Typography variant="h3" sx={{ color: component.color }}>
        {component.header}
      </Typography>
      <Divider />
      {information.map((e) => (
        <FlexBox key={e.id} pb={1}>
          <Iconify icon={e.icon} width={20} color={component.color} />
          <input defaultValue={e.title} style={{ fontSize: '14px', marginLeft: '8px', border: '0px', backgroundColor: 'inherit' }} />
        </FlexBox>
      ))}
    </Stack>
  );
};
