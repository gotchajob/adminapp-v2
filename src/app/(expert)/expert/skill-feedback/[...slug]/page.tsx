"use client";
import { Text } from "components/common/text/text";
import { CustomerReview } from "components/review";
import { useGetExpertBookingTotalRating } from "hooks/use-get-expert-booking-total-rating";
import { useGetExpertTotalSkillRating } from "hooks/use-get-expert-total-skill-rating";
import MainCard from "ui-component/cards/MainCard";

export default function Page({ params }: { params: { slug: string[] } }) {
  const { ratingParams } = useGetExpertTotalSkillRating(
    { expertSkillOptionId: +params.slug[1] },
    { pageNumber: 1, pageSize: 1000, sortBy: "createdAt", expertSkillOptionId: +params.slug[1] },
    0
  );
  return (
    <MainCard
      title={<Text variant="h4">Thông tin đánh giá về {decodeURI(params.slug[0])}</Text>}
    >
      {ratingParams && <CustomerReview ratingParams={ratingParams} />}
    </MainCard>
  );
}
