import { RatingParams } from "components/review";
import { useEffect, useState } from "react";
import { ExpertToken } from "./use-login";
import { GetExpertTotalSkillRating, GetExpertTotalSkillRatingRequest } from "package/api/expert-skill-rating/total-rating";
import { GetExpertSkillRating, GetExpertSkillRatingRequest } from "package/api/expert-skill-rating/for-expert";
import { formatDate } from "package/util";

export const useGetExpertTotalSkillRating = (
  params1: GetExpertTotalSkillRatingRequest,
  params2: GetExpertSkillRatingRequest,
  refreshTime: number
) => {
  const [ratingParams, setRatingParams] = useState<RatingParams | undefined>();

  const { expertToken } = ExpertToken();

  const getTotalRating = async () => {
    const totalRating = await GetExpertTotalSkillRating(params1, expertToken);
    const feedback = await GetExpertSkillRating(params2, expertToken);
    const newRatingParams: RatingParams = {
      feedbackList: [],
      totalRatingList: [
        { rating: 1, count: 0 },
        { rating: 2, count: 0 },
        { rating: 3, count: 0 },
        { rating: 4, count: 0 },
        { rating: 5, count: 0 },
      ],
    };

    totalRating.data.forEach((value) => {
      const index = newRatingParams.totalRatingList.findIndex(
        (e) => e.rating === value.rating
      );
      newRatingParams.totalRatingList[index].count = newRatingParams.totalRatingList[index].count + value.count
    });

    console.log(feedback)

    feedback.data.list.forEach((value) =>
      newRatingParams.feedbackList.push({
        ...value,
        createdAt: formatDate(value.createdAt, "dd/MM/yyyy"),
        user: {
          avatar: "",
          fullName: "Nguời dùng",
        },
        href: `#`,
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
