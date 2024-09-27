
import { BookingReport, GetBookingReport, GetBookingReportRequest } from "package/api/booking-report";
import { BookingReportForExpert, GetBookingReportForExpert, GetBookingReportForExpertRequest } from "package/api/booking-report/for-expert";
import { BookingReportById, GetBookingReportById, GetBookingReportByIdRequest } from "package/api/booking-report/id";
import { useEffect, useState } from "react";

export const UseGetBookingReport = (params: GetBookingReportRequest, refresh: number, accessToken: string) => {
    const [bookingReport, setBookingReport] = useState<{
        list: BookingReport[];
        totalPage: number;
    }>({
        list: [],
        totalPage: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);

    const fetchGetBookingReport = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetBookingReport(params, accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setBookingReport(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchGetBookingReport(); }, [params.pageNumber, params.pageSize, params.sortBy, refresh, accessToken])

    return {
        bookingReport, loading
    }
}

export const UseGetBookingReportForExpert = (params: GetBookingReportForExpertRequest, refresh: number, accessToken: string) => {
    const [bookingReportForExpert, setBookingReportForExpert] = useState<{
        list: BookingReportForExpert[];
        totalPage: number;
    }>({
        list: [],
        totalPage: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);

    const fetchGetBookingReportForExpert = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetBookingReportForExpert(params, accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setBookingReportForExpert(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchGetBookingReportForExpert(); }, [params.pageNumber, params.pageSize, params.sortBy, refresh, accessToken])

    return {
        bookingReportForExpert, loading
    }
}

export const UseGetBookingReportById = (params: GetBookingReportByIdRequest, accessToken: string, refresh: number) => {
    const [bookingReportById, setBookingReportById] = useState<BookingReportById>();

    const [loading, setLoading] = useState<boolean>(true);

    const fetchGetBookingReportById = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetBookingReportById(params, accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setBookingReportById(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchGetBookingReportById(); }, [params.id, refresh, accessToken])

    return {
        bookingReportById, loading
    }
}