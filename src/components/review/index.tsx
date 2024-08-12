"use client";

import { useEffect, useState } from "react";

// material-ui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import ProductReview from "ui-component/cards/ProductReview";

// assets
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import { BookingTotalRating } from "package/api/booking-customer-feedback/total-rating";
import { StyledLink } from "components/common/link/styled-link";
import { formatDate } from "package/util";
import SubCard from "ui-component/cards/SubCard";

interface ProgressProps {
  like: number;
  star: number;
  value: number;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

// progress
function LinearProgressWithLabel({
  like,
  star,
  color,
  value,
  ...others
}: ProgressProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 50 }}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${Math.round(star)} Stars`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          value={value}
          variant="determinate"
          color={color}
          {...others}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="subtitle1">{`(${Math.round(like)})`}</Typography>
      </Box>
    </Box>
  );
}

export interface RatingParams {
  totalRatingList: TotalRating[];
  feedbackList: Feedback[];
}

interface TotalRating {
  rating: number;
  count: number;
}

interface Feedback {
  rating: number;
  comment: string;
  createdAt: string;
  href: string;
  user: {
    avatar: string;
    fullName: string;
  };
}

export const CustomerReview = ({
  ratingParams,
}: {
  ratingParams: RatingParams;
}) => {
  const { total, numberRating } = calculateTotalRating(
    ratingParams.totalRatingList
  );

  const RenderTotalRating = (
    <MainCard content={false} sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%" }}>
        {ratingParams.totalRatingList && (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ height: "100%" }}
          >
            <Typography variant="subtitle1">Average Rating</Typography>
            <Typography variant="h1" color="primary">
              {Number(total)}/5
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                name="simple-controlled"
                value={total}
                icon={<StarTwoToneIcon fontSize="inherit" />}
                emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                readOnly
                precision={0.1}
              />
              <Typography pt={0.4}>({numberRating} lượt)</Typography>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </MainCard>
  );

  const RenderDetailRating = (
    <MainCard content={false} sx={{ height: "100%" }}>
      <CardContent>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          {ratingParams.totalRatingList.map((value, index) => (
            <Grid item xs={12} key={index}>
              <LinearProgressWithLabel
                color="secondary"
                star={value.rating}
                value={15}
                like={125}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </MainCard>
  );

  const RenderReview = (
    <SubCard>
      <Grid container spacing={3}>
        {ratingParams.feedbackList &&
          ratingParams.feedbackList.map((feedback, index) => (
            <Grid item xs={12} key={index}>
              <StyledLink href={feedback.href}>
                <ProductReview
                  avatar={feedback.user.avatar}
                  date={feedback.createdAt}
                  name={feedback.user.fullName}
                  rating={feedback.rating}
                  review={feedback.comment}
                />
              </StyledLink>
            </Grid>
          ))}
      </Grid>
    </SubCard>
  );
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {RenderTotalRating}
      </Grid>
      <Grid item xs={4}>
        {RenderDetailRating}
      </Grid>
      <Grid item xs={12}>
        {RenderReview}
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center">
          <Button variant="text"> Load more Comments </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

const calculateTotalRating = (totalRatingList: TotalRating[]) => {
  let total = 0;
  let numberRating = 0;
  console.log(totalRatingList)
  totalRatingList.forEach((value) => {
    total = total + value.rating;
    numberRating = numberRating + value.count;
  });
  return { total: total / totalRatingList.length, numberRating };
};
