// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Profile = () => {
  const { user } = useAuth();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item sm={6} md={4}>
        <SubCard title="Ảnh đại diện" contentSX={{ textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar alt="User 1" src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                Phu
              </Typography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item sm={6} md={8}>
        <SubCard title="Hồ sơ người dùng">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField id="outlined-basic1" fullWidth label="Name" defaultValue={user?.name} value={"Phu"} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic6" fullWidth label="Email" defaultValue="phu@example.com" disabled />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic4" fullWidth label="Số điện thoại" defaultValue="123-456-789" disabled />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic5" fullWidth label="Địa chi" defaultValue="Thành phố Hồ Chí Minh" disabled />
            </Grid>
            {/* <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button variant="contained">Change Details</Button>
                </AnimateButton>
              </Stack>
            </Grid> */}
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
