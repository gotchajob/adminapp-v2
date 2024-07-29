
import { BookingExpertFeedback, GetBookingExpertFeedback, GetBookingExpertFeedbackRequest } from "package/api/booking-expert-feedback-controller";
import { useEffect, useState } from "react";

export const UseGetBookingExpertFeedback = (params: GetBookingExpertFeedbackRequest) => {
    const [bookingExpertFeedback, setBookingExpertFeedback] = useState<BookingExpertFeedback[]>([]);

    const [loading, setLoading] = useState();

    const fetchGetBookingExpertFeedback = async () => {
        try {
            const res = await GetBookingExpertFeedback(params);
            if (res.status !== "success") {
                return;
            }
            setBookingExpertFeedback(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingExpertFeedback(); }, [params.bookingId]);

    return {
        bookingExpertFeedback
    }
}