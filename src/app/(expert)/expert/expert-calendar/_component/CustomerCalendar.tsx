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
import { dispatch, useSelector } from 'store';
import { addEvent, getEvents, removeEvent, updateEvent } from 'store/slices/calendar';
import { DateRange } from 'types';
import { useEffect, useRef, useState } from "react";
import CustomerToolbar from "./CustomerCalendarToolbar";

const fakeEvents = [
    {
        title: 'Đặt lịch thành công',
        description: 'Đặt lịch thành công với Anshan Handgun',
        color: '#198754',
        textColor: '#ffffff',
        start: '2024-07-02T09:00:00',
        end: '2024-07-02T10:00:00'
    },
    {
        title: 'Đã đặt lịch',
        description: 'Chờ phản hồi từ chuyên gia Anshan Handgun',
        color: '#FFC107',
        textColor: '#ffffff',
        start: '2024-07-04T09:00:00',
        end: '2024-07-04T10:00:00'
    },
    {
        title: 'Đã hủy đặt lịch',
        description: 'Hủy lịch do cần chọn chuyên gia khác',
        color: '#ED4337',
        textColor: '#ffffff',
        start: '2024-07-03T14:00:00',
        end: '2024-07-03T15:00:00'
    },
    {
        title: 'Hoàn tất phỏng vấn',
        description: 'Kỹ năng chuyên môn tốt',
        color: '#2196F3',
        textColor: '#ffffff',
        start: '2024-07-05T14:00:00',
        end: '2024-07-05T15:00:00'
    },
];

const CustomerCalendarPage = ({ onNext, onSelectEvent }: { onNext: () => void, onSelectEvent: (event: any) => void }) => {
    const calendarRef = useRef<FullCalendar>(null);

    const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const [loading, setLoading] = useState<boolean>(true);

    // fetch events data
    const [events, setEvents] = useState<FormikValues[]>([]);

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

    const handleEventSelect = (arg: EventClickArg) => {
        if (arg) {
            const selectEvent = fakeEvents.find((_event) => _event.title === arg.event._def.title);
            if (onSelectEvent) {
                onSelectEvent(selectEvent);
            }
        }
        if (onNext) {
            onNext();
        }
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

    if (loading) return <Loader />;

    return (
        <Box
            sx={{
                height: '100%',
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
                        events={fakeEvents}
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