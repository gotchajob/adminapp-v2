import { RatingParams } from "components/review";
import {
  GetBookingFeedback,
  GetBookingFeedbackRequest,
} from "package/api/booking-customer-feedback/for-expert";
import { GetBookingTotalRating } from "package/api/booking-customer-feedback/total-rating";
import { useEffect, useState } from "react";
import { ExpertToken } from "./use-login";

export const useGetExpertBookingTotalRating = (
  params: GetBookingFeedbackRequest,
  refreshTime: number
) => {
  const [ratingParams, setRatingParams] = useState<RatingParams | undefined>();

  const { expertToken } = ExpertToken();

  const getTotalRating = async () => {
    const totalRating = await GetBookingTotalRating({}, expertToken);
    const feedback = await GetBookingFeedback(params, expertToken);
    const newRatingParams: RatingParams = {
      feedbackList: [],
      totalRatingList: [
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 },
      ],
    };

    totalRating.data.forEach((value) => {
      const index = newRatingParams.totalRatingList.findIndex(
        (e) => e.rating === value.rating
      );
      newRatingParams.totalRatingList[index].count = newRatingParams.totalRatingList[index].count + value.count
    });

    feedback.data.list.forEach((value) =>
      newRatingParams.feedbackList.push({
        ...value,
        user: {
          avatar: "",
          fullName: "Nguời dùng",
        },
        href: `/expert/interview/${value.bookingId}`,
      })
    );
    setRatingParams(newRatingParams);
  };

  useEffect(() => {
    if (expertToken) {
      getTotalRating();
    }
  }, [refreshTime, expertToken]);

  return {
    ratingParams,
  };
};
