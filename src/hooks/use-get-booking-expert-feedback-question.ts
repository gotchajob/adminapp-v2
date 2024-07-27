
import { BookingExpertFeedbackQuestion, GetBookingExpertFeedbackQuestion } from "package/api/booking-expert-feedback-question-controller";
import { useEffect, useState } from "react";

export const UseGetBookingExpertFeedbackQuestion = () => {
    const [bookingExpertFeedbackQuestion, setBookingExpertFeedbackQuestion] = useState<BookingExpertFeedbackQuestion[]>([]);

    const [loading, setLoading] = useState();

    const fetchGetBookingExpertFeedbackQuestion = async () => {
        try {
            const res = await GetBookingExpertFeedbackQuestion();
            if (res.status !== "success") {
                return;
            }
            setBookingExpertFeedbackQuestion(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingExpertFeedbackQuestion(); }, []);

    return {
        bookingExpertFeedbackQuestion
    }
}