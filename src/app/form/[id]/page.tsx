'use client';

import React, { useState } from 'react';

// material-ui
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project imports
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from 'hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { useFormik } from 'formik';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { UploadImageButton } from 'components/common/button/upload-button';
import { useRouter } from 'next/navigation';
import { ExpertSkillOption, PostCreateExpertAccount } from 'package/api/user/create-expert-account';
import { AddressData, useGetCountry, useGetDistrict, useGetProvince, useGetWard } from 'hooks/use-address';
import { formatDate } from 'package/util';
import { DialogActions } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SkillForm } from './_components/skill';

const logo = '/assets/images/logo/logo.png';

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //

export default function Page({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);

  const [provinceCode, setProvinceCode] = useState<string>('');

  const [districtCode, setDistrictCode] = useState<string>('');

  const [education, setEducation] = useState<string[]>(['', '', '']);

  const [nation, setNation] = useState<string[]>(['Vietnam']);

  const [expertSkillOptionList, setExpertSkillOptionList] = useState<ExpertSkillOption[]>([]);

  const router = useRouter();

  const { provinceOptions } = useGetProvince();

  const { districtOptions } = useGetDistrict(provinceCode);

  const { wardOptions } = useGetWard(districtCode);

  const { countries } = useGetCountry();

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    avatar: 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg',
    street: '',
    ward: '',
    district: '',
    province: '',
    birthDate: '',
    bio: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedInUrl: '',
    yearExperience: 0
  };

  const formSchema = yup.object().shape({});

  const handleFormSubmit = async (value: typeof initialValues) => {
    try {
      setIsLoading(true);
      const res = await PostCreateExpertAccount({
        ...value,
        portfolioUrl: '',
        address: `${values.street}, Phường xã: ${values.ward}, Quận huyện: ${values.district}, Thành phố: ${values.province}`,
        education: education.join('[]'),
        nationSupport: nation,
        expertSKillOptionList: expertSkillOptionList
      });
      if (res.status === 'error') {
        throw new Error(res.responseText);
      }
      enqueueSnackbar(res.responseText, { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  });

  const handleChangeEducation = (e: string, index: number) => {
    const newEducation = education;
    newEducation[index] = e;
    setEducation(newEducation);
  };
  return (
    <Container maxWidth="lg">
      {/* FORM */}
      <form autoComplete="on" onSubmit={handleSubmit}>
        <SubCard>
          {/* Logo Section */}
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <Grid container alignItems="center" justifyContent="center" spacing={1}>
              <Grid item>
                <Image
                  src={logo}
                  height={210}
                  width={210}
                  alt="Gotchajob_logo"
                  style={{ maxWidth: '100%', height: '100%', marginTop: '6px' }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Personal Information Subcard */}
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Thông tin cá nhân">
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6}>
                  <TextField
                    name="lastName"
                    label="Họ"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={(touched.lastName && errors.lastName) as string}
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    name="firstName"
                    label="Tên"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={(touched.firstName && errors.firstName) as string}
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      slotProps={{ textField: { fullWidth: true } }}
                      format="dd/MM/yyyy"
                      label="Ngày sinh"
                      onChange={(newValue: Date | null) => {
                        try {
                          setFieldValue('birthDay', formatDate(newValue?.toISOString() || '', 'dd/MM/yyyy'));
                        } catch (error) { }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    select
                    name="province"
                    fullWidth
                    label="Tỉnh / Thành phố"
                    value={values.province}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.province && !!errors.province}
                    helperText={(touched.province && errors.province) as string}
                  >
                    {provinceOptions?.map((option) => (
                      <MenuItem
                        key={option.idProvince}
                        value={option.name}
                        onClick={() => {
                          setProvinceCode(option.idProvince);
                        }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    select
                    name="district"
                    fullWidth
                    label="Quận / huyện"
                    value={values.district}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={values.province === ''}
                    error={!!touched.district && !!errors.district}
                    helperText={(touched.district && errors.district) as string}
                  >
                    {districtOptions?.map((option) => (
                      <MenuItem
                        key={option.idDistrict}
                        value={option.name}
                        onClick={() => {
                          setDistrictCode(option.idDistrict);
                        }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    select
                    name="ward"
                    fullWidth
                    label="Phường / Xã"
                    value={values.ward}
                    disabled={values.district === ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.ward && !!errors.ward}
                    helperText={(touched.ward && errors.ward) as string}
                  >
                    {wardOptions?.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    label="Số nhà, tên đường"
                    name="street"
                    fullWidth
                    value={values.street}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.street && !!errors.street}
                    helperText={(touched.street && errors.street) as string}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    multiline
                    minRows={4}
                    label="Thông tin thêm"
                    name="bio"
                    fullWidth
                    value={values.bio}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.bio && !!errors.bio}
                    helperText={(touched.bio && errors.bio) as string}
                  />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          {/* Contact Information SubCard */}
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Thông tin xã hội & liên lạc">
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6}>
                  <Box justifyContent={'center'} alignItems={'center'} display={'flex'} position={'relative'}>
                    <UploadImageButton
                      setImage={(e: string) => {
                        setFieldValue('avatar', e);
                      }}
                    />
                    <Image
                      src={values.avatar}
                      alt="avatar"
                      width={100}
                      height={100}
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        border: '1px solid black',
                        borderRadius: 20,
                        borderColor: '#2188ff',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item lg={12}>
                      <TextField
                        label="Số điện thoại"
                        name="phone"
                        fullWidth
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.phone && !!errors.phone}
                        helperText={(touched.phone && errors.phone) as string}
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.email && !!errors.email}
                        helperText={(touched.email && errors.email) as string}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}></Grid>
                <Grid item lg={12}>
                  <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                    <Grid item xs>
                      <TextField
                        label="Facebook"
                        name="facebookUrl"
                        fullWidth
                        value={values.facebookUrl}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.facebookUrl && !!errors.facebookUrl}
                        helperText={(touched.facebookUrl && errors.facebookUrl) as string}
                      />
                    </Grid>
                    <Grid item>
                      <FacebookIcon />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                    <Grid item xs>
                      <TextField
                        label="Twitter"
                        name="twitterUrl"
                        fullWidth
                        value={values.twitterUrl}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.twitterUrl && !!errors.twitterUrl}
                        helperText={(touched.twitterUrl && errors.twitterUrl) as string}
                      />
                    </Grid>
                    <Grid item>
                      <TwitterIcon />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                    <Grid item xs>
                      <TextField
                        label="LinkedIn"
                        name="linkedInUrl"
                        fullWidth
                        value={values.linkedInUrl}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.linkedInUrl && !!errors.linkedInUrl}
                        helperText={(touched.linkedInUrl && errors.linkedInUrl) as string}
                      />
                    </Grid>
                    <Grid item>
                      <LinkedInIcon />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          {/* Education Subcard */}
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Chứng chỉ & bằng cấp">
              <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                {['First Certification', 'Second Certification', 'Third Certification'].map((label, index) => (
                  <Grid item lg={12} zeroMinWidth key={index}>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        handleChangeEducation(e.target.value, index);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </SubCard>
          </Grid>
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Lĩnh vực đăng kí">
              <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                <Grid item lg={6} zeroMinWidth>
                  <TextField
                    label="Năm kinh nghiệm"
                    name="yearExperience"
                    fullWidth
                    type="number"
                    value={values.yearExperience}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.yearExperience && !!errors.yearExperience}
                    helperText={(touched.yearExperience && errors.yearExperience) as string}
                  />
                </Grid>
                <Grid item lg={6} zeroMinWidth>
                  <Autocomplete
                    multiple
                    options={countries}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Quốc gia hỗ trợ" />}
                    defaultValue={nation}
                    onChange={(e, v) => {
                      setNation(v);
                    }}
                  />
                </Grid>
                <Grid item lg={12} zeroMinWidth>
                  <SkillForm setExpertSkillOptionList={setExpertSkillOptionList} />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          <DialogActions>
            <Button variant="outlined" color="error">
              Xóa
            </Button>
            <LoadingButton variant="contained" type="submit">
              Gửi
            </LoadingButton>
          </DialogActions>
        </SubCard>
      </form>
    </Container>
  );
}
