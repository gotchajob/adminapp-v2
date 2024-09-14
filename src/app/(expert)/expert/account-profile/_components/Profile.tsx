"use client";

// material-ui
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { LinearProgressProps } from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// project imports
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  useGetExpertProfile,
  useGetExpertNatonSupport,
  useGetExpertCurrent,
} from "hooks/use-get-expert-profile";
import { useRefresh } from "hooks/use-refresh";
import { useEffect, useState } from "react";
import { gridSpacing } from "store/constant";
import SubCard from "ui-component/cards/SubCard";
import Avatar from "ui-component/extended/Avatar";

// assets
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import { IconEdit } from "@tabler/icons-react";
import { useGetExpertSkillOptions } from "hooks/use-get-expert-skill-option";
import { formatDate, formatNumber } from "package/util";
import { ExpertNation } from "package/api/expert-nation-support";
import { ExpertToken } from "hooks/use-login";
import { useGetNationSupportCurrent } from "hooks/use-get-nation-support";
import { ExpertCurrent } from "package/api/expert/current";
import { useGetCategories } from "hooks/use-get-category";
import { useGetSkill } from "hooks/use-get-skill";
import { useGetSkillOptions } from "hooks/use-get-skill-option";
import { FlexBetween } from "components/common/box/flex-box";
import { Text } from "views/forms/input/text/text";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { StyledLink } from "components/common/link/styled-link";
import MainCard from "ui-component/cards/MainCard";
import ImagePlaceholder from "ui-component/cards/Skeleton/ImagePlaceholder";
import { CardMedia, useTheme } from "@mui/material";

// ==============================|| PROFILE 2 - Expert PROFILE ||============================== //

export interface EducationData {
  time: string;
  timeDes: string;
  title: string;
  titleDes: string;
}

const User1 = '/assets/images/users/img-user.png';

const Cover = '/assets/images/profile/img-profile-bg.png';

const Profile = ({ expert }: { expert?: ExpertCurrent }) => {
  const theme = useTheme();

  const { refreshTime, refresh } = useRefresh();

  const { expertToken } = ExpertToken();

  const { nationSupportCurrent, loading: nationSupportCurrentLoading } =
    useGetNationSupportCurrent(expertToken, refreshTime);

  const covertNationString = () => {
    const array: string[] = [];
    nationSupportCurrent?.forEach((value) => array.push(value.nation));
    return array?.join(", ");
  };

  const { expertSkillOptions } = useGetExpertSkillOptions({
    expertId: expert?.expertId,
  });

  return (
    <Grid container spacing={gridSpacing}>
      {expert ? (
        <>
          <Grid item xs={12}>
            <MainCard
              contentSX={{
                p: 1.5,
                paddingBottom: '0px !important'
              }}
            >
              {expert ? (
                <CardMedia
                  component="img"
                  image={!expert.backgroundImage || expert.backgroundImage === '' ? Cover : expert.backgroundImage}
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    mb: 3,
                    width: '100%',
                    height: '260px',
                    objectFit: 'cover',
                  }}
                  alt="profile-background"
                />
              ) : (
                <ImagePlaceholder
                  sx={{
                    borderRadius: `10px`,
                    overflow: 'hidden',
                    mb: 3,
                    height: { xs: 85, sm: 150, md: 260 }
                  }}
                />
              )}
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={3}>
                  {expert ? (
                    <Avatar
                      alt="User 1"
                      src={expert.avatar}
                      sx={{
                        margin: '-70px 0 0 auto',
                        borderRadius: '16px',
                        [theme.breakpoints.down('lg')]: {
                          margin: '-70px auto 0'
                        },
                        [theme.breakpoints.down('md')]: {
                          margin: '-60px auto 0'
                        },
                        width: { xs: 72, sm: 100, md: 140 },
                        height: { xs: 72, sm: 100, md: 140 }
                      }}
                    />
                  ) : (
                    <ImagePlaceholder
                      sx={{
                        margin: '-70px 0 0 auto',
                        borderRadius: '16px',
                        [theme.breakpoints.down('lg')]: {
                          margin: '-70px auto 0'
                        },
                        [theme.breakpoints.down('md')]: {
                          margin: '-60px auto 0'
                        },
                        width: { xs: 72, sm: 100, md: 140 },
                        height: { xs: 72, sm: 100, md: 140 }
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5">{expert.lastName + ' ' + expert.firstName}</Typography>
                      {/* <Typography variant="subtitle2">{expert.shortDescription}</Typography> */}
                    </Grid>
                    <Grid item xs={12} md={8}>
                      {/* <Grid
                        container
                        spacing={1}
                        sx={{
                          justifyContent: 'flex-end',
                          alignItems: 'center'
                        }}
                      >
                        <Grid item>
                          <Button sx={{ textTransform: 'none' }} variant="outlined">
                            {`${formatNumber(expert.cost)} đ / Một buổi phỏng vấn`}
                          </Button>
                        </Grid>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item lg={4} xs={12}>
            <SubCard
            // title={
            //   <Grid container spacing={2} alignItems="center">
            //     <Grid item>
            //       <Avatar alt="User 1" src={expert?.avatar} />
            //     </Grid>
            //     <Grid item xs zeroMinWidth>
            //       <Typography variant="subtitle1">
            //         {expert.firstName} {expert.lastName}
            //       </Typography>
            //     </Grid>
            //   </Grid>
            // }
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
                    <Typography variant="body2">
                      {covertNationString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Năm kinh nghiệm</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {expert.yearExperience} năm
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>

              <Divider sx={{ margin: "16px 0" }} />
              <Grid
                container
                spacing={2}
                sx={{
                  "& >div": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "block",
                    width: "100%",
                  },
                  "& a": {
                    color: "grey.700",

                    "& svg": {
                      mr: 1,
                      verticalAlign: "bottom",
                    },
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "none",
                    },
                  },
                }}
              >
                <Grid item xs={12}>
                  <Link
                    href="https://www.twitters.com/codedthemes"
                    target="_blank"
                    underline="hover"
                  >
                    <InstagramIcon sx={{ color: "orange.dark" }} />{" "}
                    {expert.twitterUrl}
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link
                    href="https://www.facebook.com/codedthemes"
                    target="_blank"
                    underline="hover"
                  >
                    <FacebookIcon color="primary" /> {expert.facebookUrl}
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link
                    href="https://in.linkedin.com/company/codedthemes"
                    target="_blank"
                    underline="hover"
                  >
                    <LinkedInIcon sx={{ color: "grey.900" }} />{" "}
                    {expert.linkedinUrl}
                  </Link>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <SubCard title="Thông tin cá nhân">
                  <Grid container spacing={2}>
                    <Divider sx={{ pt: 1 }} />
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table
                          sx={{
                            "& td": {
                              borderBottom: "none",
                            },
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
                              <TableCell>
                                {" "}
                                {formatDate(expert.birthDate, "dd/MM/yyyy")}
                              </TableCell>
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
                    {expert.education !== undefined &&
                      JSON.parse(expert.education).map(
                        (row: EducationData, index: number) => (
                          <Grid item xs={12} key={index}>
                            <Grid container>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">
                                  {row.time}
                                </Typography>
                                <Typography variant="subtitle2">
                                  {row.timeDes}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={8}>
                                <Typography variant="subtitle1">
                                  {row.title}
                                </Typography>
                                <Typography variant="subtitle2">
                                  {row.titleDes}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        )
                      )}
                  </Grid>
                </SubCard>
              </Grid>
            </Grid>
          </Grid>
          {expertSkillOptions?.map((skillOption, index) => (
            <Grid item xs={4} key={index}>
              <StyledLink
                href={`/expert/skill-feedback/${skillOption.skillOptionName}/${skillOption.id}`}
              >
                <SubCard title={skillOption.skillOptionName}>
                  <FlexBetween>
                    <Rating
                      value={skillOption.sumPoint}
                      size="small"
                      readOnly
                    />
                    <Text fontSize={13}>
                      <span style={{ fontWeight: "bold" }}>
                        {skillOption.totalRating}
                      </span>{" "}
                      lượt đánh giá
                    </Text>
                  </FlexBetween>
                </SubCard>
              </StyledLink>
            </Grid>
          ))}
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Grid>
  );
};

export default Profile;
