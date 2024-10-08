'use client';

import { useEffect, useRef, useState } from 'react';

// material-ui
import Dialog from '@mui/material/Dialog';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { FormikValues } from 'formik';
import AddAlarmTwoToneIcon from '@mui/icons-material/AddAlarmTwoTone';

// project imports
import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import CalendarStyled from 'components/application/calendar/CalendarStyled';
import { dispatch, useSelector } from 'store';
import { addEvent, getEvents, removeEvent, updateEvent } from 'store/slices/calendar';
import { DateRange } from 'types';
import Loader from 'ui-component/Loader';
import SubCard from 'ui-component/cards/SubCard';
import { StyledLink } from 'components/common/link/styled-link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useRouter } from 'next/navigation';
import { useRefresh } from 'hooks/use-refresh';
import { ExpertToken } from 'hooks/use-login';
import { useGetExpertCurrent } from 'hooks/use-get-expert-profile';
import { useGetAvailability } from 'hooks/use-get-availability';
import ExpertToolbar from './ExpertCalendarToolbar';

// ==============================|| APPLICATION CALENDAR ||============================== //

const fakeEvents = [
    // {
    //     id: 1,
    //     title: 'Available Slot',
    //     description: 'This slot is available',
    //     color: '#697586',
    //     textColor: '#ffffff',
    //     start: '2024-07-10T09:00:00',
    //     end: '2024-07-10T10:00:00'
    // },
    // {
    //     id: 2,
    //     title: 'Available Slot',
    //     description: 'This slot is available',
    //     color: '#697586',
    //     textColor: '#ffffff',
    //     start: '2024-07-11T09:00:00',
    //     end: '2024-07-11T10:00:00'
    // },
    // {
    //     id: 3,
    //     title: 'Interview - CV Review',
    //     description: 'Reviewing CVs for interviews',
    //     color: '#00E676',
    //     textColor: '#ffffff',
    //     start: '2024-07-09T14:00:00',
    //     end: '2024-07-09T15:00:00'
    // },
    // {
    //     id: 4,
    //     title: 'Interview - CV Review',
    //     description: 'Reviewing CVs for interviews',
    //     color: '#00E676',
    //     textColor: '#ffffff',
    //     start: '2024-07-08T14:00:00',
    //     end: '2024-07-08T15:00:00'
    // },
];

const ExpertCalendarPage = ({ params }: { params: { id: string } }) => {
    const calendarRef = useRef<FullCalendar>(null);

    const route = useRouter();

    const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<FormikValues | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    // fetch events data
    const [events, setEvents] = useState<FormikValues[]>([]);

    const calendarState = useSelector((state) => state.calendar);

    const [date, setDate] = useState(new Date());

    const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

    const { refreshTime, refresh } = useRefresh();

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
        console.log(arg.event);
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

    const handleAddClick = () => {
        setIsModalOpen(true);
    }

    const { availabilities } = useGetAvailability({ expertId: +params?.id }, refreshTime);

    const convertEvents = (data: any) => {
        return data.map((event: any) => ({
            id: event.id.toString(),
            title: `Event ${event.id}`,
            start: `${event.date}T${event.startTime}`,
            end: `${event.date}T${event.endTime}`
        }));
    };

    useEffect(() => {
        const convertedEvents = convertEvents(availabilities);
        console.log("convertedEvents :", convertedEvents);
        setEvents(convertedEvents);
    }, [params.id, availabilities]);

    useEffect(() => {
        dispatch(getEvents()).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        setEvents(calendarState.events);
    }, [calendarState]);

    // set calendar view
    useEffect(() => {
        handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
    }, [matchSm]);

    if (loading) return <Loader />;

    return (
        <Box px={2} py={1}>
            <CalendarStyled>
                <ExpertToolbar
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
                        initialView={view}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleRangeSelect}
                        eventDrop={handleEventUpdate}
                        eventClick={handleEventSelect}
                        eventResize={handleEventUpdate}
                        height={matchSm ? 'auto' : 720}
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                    />
                </SubCard>
            </CalendarStyled>

            {/* Dialog thêm sự kiện */}
            {/* <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                {isModalOpen && (
                    <AddEventOnExpertCalendar
                        event={selectedEvent}
                        range={selectedRange}
                        onCancel={handleModalClose}
                        handleDelete={handleEventDelete}
                        handleCreate={handleEventCreate}
                        handleUpdate={handleUpdateEvent}
                    />
                )}
            </Dialog> */}
        </Box>
    );
};

export default ExpertCalendarPage;


