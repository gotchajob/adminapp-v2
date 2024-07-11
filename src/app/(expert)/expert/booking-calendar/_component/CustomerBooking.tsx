"use client";

// material-ui
import FullCalendar from "@fullcalendar/react";
import { Box, Dialog } from "@mui/material";
import CalendarStyled from 'components/application/calendar/CalendarStyled';
import Loader from "ui-component/Loader";
import SubCard from "ui-component/cards/SubCard";
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { FormikValues } from 'formik';

// project imports
import { useRouter } from 'next/navigation';
import { dispatch, useSelector } from 'store';
import { addEvent, getEvents, removeEvent, updateEvent } from 'store/slices/calendar';
import { DateRange } from 'types';
import { useEffect, useRef, useState } from "react";
import CustomerToolbar from "./CustomerBookingToolbar";
import { useGetBooking } from "hooks/use-get-booking";
import { Booking } from "package/api/booking";

const CustomerCalendarPage = ({ onNext, onSelectEvent }: { onNext: () => void, onSelectEvent: (event: any) => void }) => {
    const calendarRef = useRef<FullCalendar>(null);

    const route = useRouter();

    const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const [loading, setLoading] = useState<boolean>(true);

    const calendarState = useSelector((state) => state.calendar);

    useEffect(() => {
        dispatch(getEvents()).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        setEvents(calendarState.events);
    }, [calendarState]);

    const [date, setDate] = useState(new Date());

    const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

    // calendar toolbar events
    const handleDateToday = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleViewChange = (newView: string) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    // set calendar view
    useEffect(() => {
        handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
    }, [matchSm]);

    const handleDatePrev = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleDateNext = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<FormikValues | null>(null);

    // calendar event select/add/edit/delete
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleRangeSelect = (arg: DateSelectArg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }

        setSelectedRange({
            start: arg.start,
            end: arg.end
        });
        setIsModalOpen(true);
    };



    const handleEventUpdate = async ({ event }: EventResizeDoneArg | EventDropArg) => {
        try {
            dispatch(
                updateEvent({
                    eventId: event.id,
                    update: {
                        allDay: event.allDay,
                        start: event.start,
                        end: event.end
                    }
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleEventCreate = async (data: FormikValues) => {
        dispatch(addEvent(data));
        handleModalClose();
    };

    const handleUpdateEvent = async (eventId: string, update: FormikValues) => {
        dispatch(updateEvent({ eventId, update }));
        handleModalClose();
    };

    const handleEventDelete = async (id: string) => {
        try {
            dispatch(removeEvent(id));
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    // ==============================|| MY ||============================== //
    // ==============================|| CODE ||============================== //
    // ==============================|| BELOW ||============================== //

    const [events, setEvents] = useState<FormikValues[]>([]);

    const handleEventSelect = (arg: EventClickArg) => {
        if (arg) {
            route.push(`http://localhost:3000/expert/booking-calendar/${arg.event._def.publicId}`);
        }
    };

    const { bookings } = useGetBooking();

    function formattedBookings(bookings: any) {
        return bookings.map((booking: any) => ({
            id: booking.id,
            title: booking.rejectReason ? 'Bị từ chối' : 'Đã đặt lịch',
            description: booking.rejectReason ? 'Lý do từ chối: ' + booking.rejectReason : 'Chờ phản hồi từ chuyên gia',
            start: booking.startInterviewDate,
            end: booking.endInterviewDate,
            color: booking.rejectReason ? '#f44336' : '#FFC107',
            textColor: '#ffffff',
        }));
    }

    useEffect(() => {
        const bookingEvents = formattedBookings(bookings);
        console.log(bookingEvents);
        setEvents(bookingEvents);
        console.log("bookings:", bookingEvents);
    }, [bookings]);

    if (loading) return <Loader />;

    return (
        <Box
            sx={{
                height: '100vh',
                paddingX: 5,
                paddingY: 1
            }}
        >
            <CalendarStyled>
                <CustomerToolbar
                    date={date}
                    view={view}
                    onClickNext={handleDateNext}
                    onClickPrev={handleDatePrev}
                    onClickToday={handleDateToday}
                    onChangeView={handleViewChange}
                />
                <SubCard>
                    <FullCalendar
                        weekends
                        editable
                        droppable
                        selectable
                        events={events}
                        ref={calendarRef}
                        rerenderDelay={10}
                        initialDate={date}
                        initialView={"listWeek"}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleRangeSelect}
                        eventDrop={handleEventUpdate}
                        eventClick={handleEventSelect}
                        eventResize={handleEventUpdate}
                        height={"auto"}
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                    />
                </SubCard>
            </CalendarStyled>
        </Box>
    )
}

export default CustomerCalendarPage;

{/* Dialog sửa sự kiện
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                {isModalOpen && (
                    <CustomerCalendarAddEvent
                        event={selectedEvent}
                        range={selectedRange}
                        onCancel={handleModalClose}
                        handleDelete={handleEventDelete}
                        handleCreate={handleEventCreate}
                        handleUpdate={handleUpdateEvent}
                    />
                )}
            </Dialog> */}