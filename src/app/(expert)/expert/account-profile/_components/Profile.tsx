'use client';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetExpertProfile, useGetExpertNatonSupport, useGetExpertCurrent } from 'hooks/use-get-expert-profile';
import { useRefresh } from 'hooks/use-refresh';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import { IconEdit } from '@tabler/icons-react';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import { Stack } from '@mui/material';
import { formatDate } from 'package/util';
import { ExpertNation } from 'package/api/expert-nation-support';
import { ExpertToken } from 'hooks/use-login';
import { useGetNationSupportCurrent } from 'hooks/use-get-nation-support';
import { GetExpertNationSupportCurrent } from 'package/api/expert-nation-support/current';
import { Expert } from 'package/api/expert/current';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 2 - Expert PROFILE ||============================== //

export interface EducationData {
  time: string;
  timeDes: string;
  title: string;
  titleDes: string;
}

// progress
function LinearProgressWithLabel({ value, ...others }: LinearProgressProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          mr: 1
        }}
      >
        <LinearProgress value={value} {...others} />
      </Box>
      <Box
        sx={{
          minWidth: 35
        }}
      >
        <Typography variant="body2" color="textSecondary">{`${Math.round(value!)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Profile = ({ expert }: { expert?: Expert; }) => {

  const { refreshTime, refresh } = useRefresh();

  const { expertToken } = ExpertToken();

  const [expertProfile, setExpertProfile] = useState<Expert | undefined>(expert);

  const { nationSupportCurrent, loading: nationSupportCurrentLoading } = useGetNationSupportCurrent(expertToken, refreshTime);

  const covertNationString = () => {
    const array: string[] = [];
    nationSupportCurrent?.forEach((value) => array.push(value.nation));
    return array?.join(', ');
  };

  // const [nation, setNation] = useState<ExpertNation[] | undefined>();

  // const { loading, expert } = useGetExpertProfile({ id: params?.id }, refreshTime);

  // const { experSkillOptions } = useGetExpertSkillOptions({ expertId: params?.id });

  // const { nation } = useGetExpertNatonSupport({ expertId: params?.id });

  // const covertNationString = () => {
  //   const array: string[] = [];
  //   nation?.forEach((value) => array.push(value.nation));
  //   return array?.join(', ');
  // };

  return (
    <Grid container spacing={gridSpacing}>
      {expert ? (
        <>
          <Grid item lg={4} xs={12}>
            <SubCard
              title={
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt="User 1" src={expert?.avatar} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="subtitle1">
                      {expert.firstName} {expert.lastName}
                    </Typography>
                  </Grid>
                </Grid>
              }
            >
              <Stack spacing={2}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Giới thiệu</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">{expert.bio}</Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Quốc gia hỗ trợ</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">{covertNationString()}</Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Năm kinh nghiệm</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">{expert.yearExperience} năm</Typography>
                  </Grid>
                </Grid>
              </Stack>

              <Divider sx={{ margin: '16px 0' }} />
              <Grid
                container
                spacing={2}
                sx={{
                  '& >div': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    width: '100%'
                  },
                  '& a': {
                    color: 'grey.700',

                    '& svg': {
                      mr: 1,
                      verticalAlign: 'bottom'
                    },
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none'
                    }
                  }
                }}
              >
                <Grid item xs={12}>
                  <Link href="https://www.twitters.com/codedthemes" target="_blank" underline="hover">
                    <InstagramIcon sx={{ color: 'orange.dark' }} /> {expert.twitterUrl}
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="https://www.facebook.com/codedthemes" target="_blank" underline="hover">
                    <FacebookIcon color="primary" /> {expert.facebookUrl}
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="https://in.linkedin.com/company/codedthemes" target="_blank" underline="hover">
                    <LinkedInIcon sx={{ color: 'grey.900' }} /> {expert.linkedinUrl}
                  </Link>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <SubCard
                  title="Thông tin cá nhân"
                >
                  <Grid container spacing={2}>
                    <Divider sx={{ pt: 1 }} />
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table
                          sx={{
                            '& td': {
                              borderBottom: 'none'
                            }
                          }}
                          size="small"
                        >
                          <TableBody>
                            <TableRow>
                              <TableCell variant="head">Địa chỉ</TableCell>
                              <TableCell>:</TableCell>
                              <TableCell> {expert.address}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell variant="head" sx={{ minWidth: 150 }}>
                                Ngày sinh
                              </TableCell>
                              <TableCell>:</TableCell>
                              <TableCell> {formatDate(expert.birthDate, 'dd/MM/yyyy')}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell variant="head">Liên lạc</TableCell>
                              <TableCell>:</TableCell>
                              <TableCell> {expert.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell variant="head">Email</TableCell>
                              <TableCell>:</TableCell>
                              <TableCell> {expert.email}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
              <Grid item xs={12}>
                <SubCard title="Thời gian">
                  <Grid container spacing={1}>
                    {expert.education !== undefined && JSON.parse(expert.education).map((row: EducationData, index: number) => (
                      <Grid item xs={12} key={index}>
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
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Grid>
  );
};

export default Profile;
