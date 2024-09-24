import { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { ExpertToken, StaffToken } from 'hooks/use-login';
import { UserChangePassword } from 'package/api/user/change-password';
import { LoadingButton } from '@mui/lab';

// Validation schema
const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Mật khẩu hiện tại là bắt buộc'),
  newPassword: yup
    .string()
    .required('Mật khẩu mới là bắt buộc')
    .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự')
    .matches(/^(?=.*[0-9])/, 'Mật khẩu phải chứa ít nhất 1 chữ số (0-9)')
    .matches(/^(?=.*[A-Z])/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa (A-Z)'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận phải trùng khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

// Component
const ChangePassword = () => {
  const { expertToken } = ExpertToken();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await UserChangePassword(
          {
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
          expertToken
        );
        if (res.status === 'success') {
          enqueueSnackbar('Mật khẩu đã được thay đổi thành công!', { variant: 'success' });
          formik.resetForm();
        } else {
          enqueueSnackbar('Có lỗi xảy ra khi đổi mật khẩu.', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Lỗi hệ thống xảy ra khi đổi mật khẩu.', { variant: 'error' });
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="Đổi mật khẩu">
          <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  id="currentPassword"
                  fullWidth
                  label="Nhập mật khẩu hiện tại"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                  helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  fullWidth
                  label="Nhập mật khẩu mới"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowNewPassword}>
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  fullWidth
                  label="Xác nhận mật khẩu mới"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowConfirmPassword}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Grid item>
                <AnimateButton>
                  <LoadingButton variant="contained" type="submit" loading={loading}>
                    Đổi mật khẩu
                  </LoadingButton>
                </AnimateButton>
              </Grid>
              <Grid item>
                <Button sx={{ color: 'info' }} onClick={() => formik.resetForm()}>
                  Bỏ thay đổi
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
