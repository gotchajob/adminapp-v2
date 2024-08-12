
import { BookingCustomerFeedbackQuestion, GetBookingCustomerFeedbackQuestion } from "package/api/booking-customer-feedback-question";
import { useEffect, useState } from "react";

export const UseGetBookingCustomerFeedbackQuestion = (refresh: number) => {
    const [bookingCustomerFeedbackQuestion, setBookingCustomerFeedbackQuestion] = useState<BookingCustomerFeedbackQuestion[]>([]);

    const [loading, setLoading] = useState();

    const fetchGetBookingCustomerFeedbackQuestion = async () => {
        try {
            const res = await GetBookingCustomerFeedbackQuestion();
            if (res.status !== "success") {
                return;
            }
            setBookingCustomerFeedbackQuestion(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingCustomerFeedbackQuestion(); }, [refresh]);

    return {
        bookingCustomerFeedbackQuestion
    }
}