"use client";
import { Text } from "components/common/text/text";
import { CustomerReview } from "components/review";
import { useGetExpertBookingTotalRating } from "hooks/use-get-expert-booking-total-rating";
import MainCard from "ui-component/cards/MainCard";

export default function Page() {
  const { ratingParams } = useGetExpertBookingTotalRating(
    { pageNumber: 1, pageSize: 10, sortBy: "createdAt" },
    0
  );
  return (
    <MainCard title={<Text variant="h4">Thông tin đánh giá của khách hàng</Text>}>
      {ratingParams && <CustomerReview ratingParams={ratingParams} />}
    </MainCard>
  );
}
