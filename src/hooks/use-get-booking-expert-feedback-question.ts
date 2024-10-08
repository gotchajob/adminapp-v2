
import { BookingExpertFeedbackQuestion, GetBookingExpertFeedbackQuestion } from "package/api/booking-expert-feedback-question";
import { GetBookingExpertFeedbackQuestionCurrent } from "package/api/booking-expert-feedback-question/current";
import { useEffect, useState } from "react";

export const UseGetBookingExpertFeedbackQuestion = (refresh: number) => {
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

    useEffect(() => { fetchGetBookingExpertFeedbackQuestion(); }, [refresh]);

    return {
        bookingExpertFeedbackQuestion
    }
}

export const UseGetBookingExpertFeedbackQuestionCurrent = (accessToken: string, refresh: number) => {

    const [bookingExpertFeedbackQuestion, setBookingExpertFeedbackQuestion] = useState<BookingExpertFeedbackQuestion[]>([]);

    const [loading, setLoading] = useState();

    const fetchGetBookingExpertFeedbackQuestionCurrent = async () => {
        try {
            const res = await GetBookingExpertFeedbackQuestionCurrent(accessToken);
            if (res.status !== "success") {
                return;
            }
            setBookingExpertFeedbackQuestion(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetchGetBookingExpertFeedbackQuestionCurrent();
        }
    }, [refresh, accessToken]);

    return {
        bookingExpertFeedbackQuestion
    }
}