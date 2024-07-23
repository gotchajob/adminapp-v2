import { Booking, GetBooking } from 'package/api/booking';
import { BookingCurrent, GetBookingCurrent } from 'package/api/booking/expert/current';
import { GetBookingById, GetBookingByIdRequest } from 'package/api/booking/id';
import { useEffect, useState } from 'react';

export const useGetBooking = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const fetchBooking = async () => {
        try {
            const data = await GetBooking();
            console.log(data.data);
            setBookings(data.data);
        } catch (error) {
            throw new Error();
        }
    };

    useEffect(() => {
        fetchBooking();
    }, []);

    return {
        bookings
    };
};

export const useGetBookingById = (params: GetBookingByIdRequest) => {
    const [booking, setBooking] = useState<Booking>();

    const fetchBookingById = async () => {
        try {
            const data = await GetBookingById(params);
            setBooking(data.data);
        } catch (error) {
            throw new Error();
        }
    };

    useEffect(() => {
        fetchBookingById();
    }, []);

    return {
        booking
    };
}

export const useGetBookingCurrent = (accessToken: string, refreshTime: any) => {
    const [bookings, setBookings] = useState<BookingCurrent[] | undefined>();

    const [loading, setLoading] = useState<boolean>();

    const fetchBookingsCurrent = async () => {
        try {
            setLoading(true);
            const data = await GetBookingCurrent(accessToken);
            setBookings(data.data);
            setLoading(false);
        } catch (error) {
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetchBookingsCurrent();
        }
    }, [accessToken, refreshTime]);

    return {
        bookings, loading
    }
}
