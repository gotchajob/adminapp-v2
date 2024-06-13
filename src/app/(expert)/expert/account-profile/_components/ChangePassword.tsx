// material-ui
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

// formik and yup
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Stack } from '@mui/material';

// validation schema
const validationSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/^(?=.*[0-9])/, "At least 1 digit (0-9)")
    .matches(/^(?=.*[A-Z])/, "At least 1 uppercase letter (A-Z)"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

// component
const ChangePassword = () => {

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Alert severity="warning" variant="outlined" sx={{ borderColor: 'warning.dark' }}>
          <AlertTitle>Alert!</AlertTitle>
          Your Password will expire every 3 months. Change it periodically.
          <strong> Do not share your password</strong>
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <SubCard title="Change Password">
          <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="currentPassword"
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                  helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                />
              </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="newPassword"
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="confirmPassword"
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Change Password
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item>
                <Button
                  sx={{ color: 'error.main' }}
                  onClick={() => formik.resetForm()}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
