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
import ExpertToolbar from './ExpertCalendarToolbar';
import AddEventOnExpertCalendar from './AddEventForm';
import { useRouter } from 'next/navigation';

// ==============================|| APPLICATION CALENDAR ||============================== //

const fakeEvents = [
    {
        id: 1,
        title: 'Available Slot',
        description: 'This slot is available',
        color: '#697586',
        textColor: '#ffffff',
        start: '2024-07-10T09:00:00',
        end: '2024-07-10T10:00:00'
    },
    {
        id: 2,
        title: 'Available Slot',
        description: 'This slot is available',
        color: '#697586',
        textColor: '#ffffff',
        start: '2024-07-11T09:00:00',
        end: '2024-07-11T10:00:00'
    },
    {
        id: 3,
        title: 'Interview - CV Review',
        description: 'Reviewing CVs for interviews',
        color: '#00E676',
        textColor: '#ffffff',
        start: '2024-07-09T14:00:00',
        end: '2024-07-09T15:00:00'
    },
    {
        id: 4,
        title: 'Interview - CV Review',
        description: 'Reviewing CVs for interviews',
        color: '#00E676',
        textColor: '#ffffff',
        start: '2024-07-08T14:00:00',
        end: '2024-07-08T15:00:00'
    },
];

const ExpertCalendarPage = ({ onNext }: { onNext: () => void }) => {
    const calendarRef = useRef<FullCalendar>(null);

    const route = useRouter();

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
        if (arg.event._def.publicId == 3 || arg.event._def.publicId == 4) {
            route.push(`http://localhost:3000/expert/expert-calendar/${arg.event._def.publicId}`);
            localStorage.setItem("PanelValue", JSON.stringify("ExpertCalendar"));
        }
        // if (arg.event.id) {
        //     const selectEvent = events.find((_event: FormikValues) => _event.id === arg.event.id);
        //     setSelectedEvent(selectEvent as FormikValues[]);
        // } else {
        //     setSelectedEvent(null);
        // }
        // setIsModalOpen(true);
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
                        events={fakeEvents}
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
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
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
            </Dialog>
        </Box>
    );
};

export default ExpertCalendarPage;


