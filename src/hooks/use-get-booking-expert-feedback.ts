
import { BookingExpertFeedback, GetBookingExpertFeedback, GetBookingExpertFeedbackRequest } from "package/api/booking-expert-feedback-controller";
import { BookingExpertFeedbackByBooking, GetBookingExpertFeedbackByBooking, GetBookingExpertFeedbackByBookingRequest } from "package/api/booking-expert-feedback-controller/by-booking";
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

export const UseGetBookingExpertFeedbackByBooking = (params: GetBookingExpertFeedbackByBookingRequest, refresh: number) => {
    const [bookingExpertFeedbackByBooking, setBookingExpertFeedbackByBooking] = useState<BookingExpertFeedbackByBooking>({
        id: 0,
        bookingId: 0,
        comment: "",
        createdAt: "",
        answer: []
    });

    const [loading, setLoading] = useState();

    const fetchGetBookingExpertFeedbackByBooking = async () => {
        try {
            const res = await GetBookingExpertFeedbackByBooking(params);
            if (res.status !== "success") {
                return;
            }
            setBookingExpertFeedbackByBooking(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingExpertFeedbackByBooking(); }, [params.bookingId]);

    return {
        bookingExpertFeedbackByBooking
    }
}