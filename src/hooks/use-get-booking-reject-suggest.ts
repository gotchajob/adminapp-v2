import { BookingReject, GetBookingRejectSuggest, GetBookingRejectSuggestRequest } from "package/api/booking-reject-suggest";
import { useEffect, useState } from "react";

export const UseGetBookingRejectSuggest = (params: GetBookingRejectSuggestRequest) => {
    const [bookingRejectSuggest, setBookingRejectSuggest] = useState<BookingReject[]>([]);

    const [loading, setLoading] = useState();

    const fetchGetBookingRejectSuggest = async () => {
        try {
            const res = await GetBookingRejectSuggest(params);
            if (res.status !== "success") {
                return;
            }
            setBookingRejectSuggest(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingRejectSuggest(); }, [params.type])

    return {
        bookingRejectSuggest
    }
}