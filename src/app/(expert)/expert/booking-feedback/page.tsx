"use client";
import { CustomerReview } from "components/review";
import { useGetExpertBookingTotalRating } from "hooks/use-get-expert-booking-total-rating";

export default function Page() {
  const { ratingParams } = useGetExpertBookingTotalRating(
    { pageNumber: 1, pageSize: 10, sortBy: "createdAt" },
    0
  );
  return <>{ratingParams && <CustomerReview ratingParams={ratingParams} />}</>;
}
