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
import { useGetExpertProfile, useGetExpertNatonSupport } from 'hooks/use-get-expert-profile';
import { useRefresh } from 'hooks/use-refresh';
import { useEffect } from 'react';
import { gridSpacing } from 'store/constant';

import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

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

const ExpertProfile = ({ params }: { params: { id: string } }) => {

  const { refreshTime, refresh } = useRefresh();

  const { loading, expert } = useGetExpertProfile({ id: +params.id }, refreshTime);

  const { ExperSkillOptions } = useGetExpertSkillOptions({ expertId: +params.id });

  const { nation } = useGetExpertNatonSupport({ expertId: +params.id });

  useEffect(() => {
    console.log("Expert:", expert);
    console.log("Nation:", nation);
    console.log("Skill Options :", ExperSkillOptions);
  }, [nation])

  const covertNationString = () => {
    const array: string[] = [];
    nation?.forEach((value) => array.push(value.nation));
    return array?.join(", ")
  }

  return (
    <Grid container spacing={gridSpacing}>
      {expert ? (
        <>
          <Grid item lg={4} xs={12}>
            <SubCard
              title={
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt="User 1" src={expert.avatar} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="subtitle1">{expert.firstName} {expert.lastName}</Typography>
                  </Grid>
                </Grid>
              }
            >
              <Stack spacing={2}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">About</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {expert.bio}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Quốc gia hỗ trợ</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {covertNationString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Năm kinh nghiệm</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {expert.yearExperience} năm
                    </Typography>
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
                // secondary={
                //   <Button>
                //     <IconEdit stroke={1.5} size="20px" aria-label="Edit Details" />
                //   </Button>
                // }
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
                              <TableCell variant="head" >Địa chỉ</TableCell>
                              <TableCell>:</TableCell>
                              <TableCell> {expert.address}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell variant="head" sx={{ minWidth: 150 }}>Ngày sinh</TableCell>
                              <TableCell>:</TableCell>
                              <TableCell> {formatDate(expert.birthDate, "dd/MM/yyyy")}</TableCell>
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
                    {JSON.parse(expert.education).map((row: EducationData, index) =>
                    (<Grid item xs={12} key={index}>
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
                    </Grid>))}
                  </Grid>
                </SubCard>
              </Grid>
              <Grid item xs={12}>
                <SubCard title="Skills">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Junior</Typography>
                      <LinearProgressWithLabel color="primary" variant="determinate" value={70} aria-label="junior-skill-progress" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">UX Researcher</Typography>
                      <LinearProgressWithLabel color="primary" variant="determinate" value={80} aria-label="UX-Researcher-skill-progress" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Wordpress</Typography>
                      <LinearProgressWithLabel color="secondary" variant="determinate" value={25} aria-label="Wordpress-skill-progress" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Graphic Designer</Typography>
                      <LinearProgressWithLabel color="primary" variant="determinate" value={80} aria-label="Designer-skill-progress" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">HTML</Typography>
                      <LinearProgressWithLabel color="secondary" variant="determinate" value={45} aria-label="HTML-skill-progress" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">PHP</Typography>
                      <LinearProgressWithLabel color="primary" variant="determinate" value={65} aria-label="PHP-skill-progress" />
                    </Grid>
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
}

export default ExpertProfile;
