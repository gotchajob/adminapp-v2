'use client';

// material-ui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// assets
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import { GetExpertSkillOption, ExpertSkillOption } from 'package/api/expert-skill-option';
import { useEffect, useState } from 'react';
import { useGetSearchParams } from 'hooks/use-get-params';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import MainCard from 'ui-component/cards/MainCard';
import { useGetExpertNatonSupport, useGetExpertProfile } from 'hooks/use-get-expert-profile';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'components/iconify/iconify';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useGetCountry } from 'hooks/use-address';
import { formatDate } from 'package/util';
import { EducationData } from 'app/form/create/[id]/_components/education';
const logo = '/assets/images/logo/logo.png';

const ExpertSkillOptionPage = ({ params }: { params: { id: number } }) => {
  const { loading, expert } = useGetExpertProfile({ id: +params.id }, false);

  const { experSkillOptions } = useGetExpertSkillOptions({ expertId: +params.id });

  const { nation } = useGetExpertNatonSupport({ expertId: +params.id });

  const { countries } = useGetCountry();
  const convertNationString = () => {
    const array: string[] = [];
    nation?.forEach((value) => array.push(value.nation));
    return array;
  };

  return (
    <>
      {expert ? (
        <>
          {/* Personal Information Subcard */}
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Thông tin cá nhân">
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6}>
                  <TextField label="Họ" value={expert.lastName} fullWidth />
                </Grid>
                <Grid item lg={6}>
                  <TextField name="firstName" label="Tên" value={expert.firstName} fullWidth />
                </Grid>
                <Grid item lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {/* <DatePicker
                      slotProps={{ textField: { fullWidth: true } }}
                      value={formatDate(expert.birthDate, "dd-MM-yyyy")}
                      format="dd-MM-yyyy"
                      label="Ngày sinh"
                    /> */}
                  </LocalizationProvider>
                </Grid>
                <Grid item lg={12}>
                  <TextField label="Địa chỉ" name="street" fullWidth value={expert.address} />
                </Grid>
                <Grid item lg={12}>
                  <TextField multiline minRows={4} label="Thông tin thêm" name="bio" fullWidth value={expert.bio} />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          {/* Contact Information SubCard */}
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Thông tin xã hội & liên lạc">
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6}>
                  <Box justifyContent={'center'} alignItems={'center'} display={'flex'}>
                    <Image
                      src={expert.avatar}
                      alt="avatar"
                      width={100}
                      height={100}
                      style={{
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon="ic:baseline-phone" />
                            </InputAdornment>
                          )
                        }}
                        value={expert.phone}
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <TextField
                        label="Email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon="ic:baseline-email" />
                            </InputAdornment>
                          )
                        }}
                        name="email"
                        fullWidth
                        autoComplete="off"
                        value={expert.email}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                    <Grid item xs>
                      <TextField label="Facebook" name="facebookUrl" fullWidth value={expert.facebookUrl} />
                    </Grid>
                    <Grid item>
                      <FacebookIcon />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                    <Grid item xs>
                      <TextField label="Twitter" name="twitterUrl" fullWidth value={expert.twitterUrl} />
                    </Grid>
                    <Grid item>
                      <TwitterIcon />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                    <Grid item xs>
                      <TextField label="LinkedIn" name="linkedInUrl" fullWidth value={expert.linkedinUrl} />
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
            {/* <EducationForm setEducation={setEducation} /> */}
            <SubCard title="Thời gian">
              <Grid
                container
                spacing={1}
                ml={3}
                alignItems="center"
                sx={{
                  position: 'relative',
                  '&>*': {
                    position: 'relative',
                    zIndex: '5'
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: '0',
                    left: 0,
                    width: '0.5px',
                    height: '100%',
                    bgcolor: 'divider',
                    zIndex: '1'
                  }
                }}
              >
                {JSON.parse(expert.education).map((row: EducationData, index: number) => (
                  <Grid item xs={12} key={index} ml={2}>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">{row.time}</Typography>
                        <Typography variant="subtitle2">{row.timeDes}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="subtitle1">{row.title}</Typography>
                        <Typography variant="subtitle2">{row.titleDes}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </SubCard>
          </Grid>
          <Grid item lg={12} sx={{ margin: '2%' }}>
            <SubCard title="Lĩnh vực đăng kí">
              <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                <Grid item lg={6} zeroMinWidth>
                  <TextField label="Năm kinh nghiệm" name="yearExperience" fullWidth type="number" value={expert.yearExperience} />
                </Grid>
                <Grid item lg={6} zeroMinWidth>
                  <Autocomplete
                    multiple
                    options={countries}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Quốc gia hỗ trợ" />}
                    value={convertNationString()}
                  />
                </Grid>
                <Grid item lg={12} zeroMinWidth>
                  {/* <SkillForm setExpertSkillOptionList={setExpertSkillOptionList} /> */}
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default ExpertSkillOptionPage;
