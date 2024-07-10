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
import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material';
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
import { useRefresh } from 'hooks/use-refresh';
import { ExpertToken } from 'hooks/use-login';
import { useGetExpertCurrent } from 'hooks/use-get-expert-profile';
import { useGetAvailability } from 'hooks/use-get-availability';
import { Availability, PostAvailability } from 'package/api/availability';

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

const ExpertCalendarPage = ({ onNext }: { onNext: () => void }) => {
    const calendarRef = useRef<FullCalendar>(null);
    const route = useRouter();
    const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<FormikValues | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
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

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

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

    // ==============================|| MY ||============================== //
    // ==============================|| CODE ||============================== //
    // ==============================|| BELOW ||============================== //

    const { expertToken } = ExpertToken();

    const { expertCurrent, loading: expertCurrentLoading } = useGetExpertCurrent(
        expertToken,
        refreshTime
    );

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newEvent, setNewEvent] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });

    const [selectEvent, setSelectEvent] = useState<any>();

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleRangeSelect = (arg: DateSelectArg) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            console.log("handleRangeSelect:", calendarApi);
            calendarApi.unselect();
        }
        setSelectedRange({
            start: arg.start,
            end: arg.end
        });
        setIsAddModalOpen(true);
    };

    const isTimeOverlap = (newEvent: FormikValues) => {
        return events.some(event =>
            newEvent.date === event.date && (
                (newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
                (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime) ||
                (newEvent.startTime <= event.startTime && newEvent.endTime >= event.endTime)
            )
        );
    };

    const handleEventSelect = (arg: EventClickArg) => {
        if (arg) {
            const selectedArg = events.find(data => data.id === arg.event.id);
            const reversedArg = reverseConvertEvents(selectedArg);
            console.log("reversedArg:", reversedArg);
            setSelectEvent(reversedArg);
            setIsEditModalOpen(true);
        }
    };

    const handleCreateNewEvent = async () => {
        try {
            if (newEvent) {
                const res = await PostAvailability(newEvent, expertToken);
                console.log("handleCreateNewEvent", res);
            }
        } catch (error) {
            throw new Error();
        }
    };

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
        setNewEvent({
            date: '',
            startTime: '',
            endTime: ''
        });
    };

    const handleEventDelete = async (id: string) => {
        try {
            dispatch(removeEvent(id));
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    const { availabilities } = useGetAvailability({ expertId: expertCurrent?.expertId });

    const convertEvents = (data: any) => {
        return data.map((event: any) => ({
            id: event.id.toString(),
            title: `Đã đặt lịch ${event.id}`, //Can check status
            color: "#00E676", //Can check status
            start: `${event.date}T${event.startTime}`,
            end: `${event.date}T${event.endTime}`
        }));
    };

    const reverseConvertEvents = (event: any) => {
        return {
            id: event.id.toString(),
            date: event.start.slice(0, 10),
            start: event.start.slice(11, 19),
            end: event.end.slice(11, 19),
        };
    };

    useEffect(() => {
        setLoading(true);
        const convertedEvents = convertEvents(availabilities);
        setEvents(convertedEvents);
        setLoading(false);
    }, [expertCurrent, availabilities, expertToken]);

    // useEffect(() => { console.log("selectEvent:", selectEvent) }, [selectEvent]);

    // useEffect(() => { console.log("newEvent:", newEvent) }, [newEvent]);

    if (loading) return <Loader />;

    return (
        <Box px={2} py={1}>
            <CalendarStyled>
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end">
                        <Button color="primary" variant="contained" onClick={handleAddClick}>
                            <AddAlarmTwoToneIcon fontSize="small" sx={{ mr: 0.75 }} />
                            Thêm lịch phỏng vấn
                        </Button>
                    </Grid>
                </Grid>
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



            {/* Dialog chỉnh sửa sự kiện */}
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isEditModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <DialogTitle>Chỉnh sửa lịch phỏng vấn</DialogTitle>
                <DialogContent>
                    {selectEvent && (
                        <>
                            <TextField
                                margin="dense"
                                label="Ngày"
                                type="date"
                                fullWidth
                                value={selectEvent.date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setSelectEvent({ ...selectEvent, date: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Giờ bắt đầu"
                                type="time"
                                fullWidth
                                value={selectEvent.start}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setSelectEvent({ ...selectEvent, start: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Giờ kết thúc"
                                type="time"
                                fullWidth
                                value={selectEvent.end}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setSelectEvent({ ...selectEvent, end: e.target.value })}
                            />
                            <Typography sx={{ fontStyle: 'italic', pt: 1 }}>Lưu ý: SA là sáng, CH là chiều</Typography>
                            <DialogActions>
                                <Button onClick={handleModalClose} color="primary">
                                    Đóng
                                </Button>
                                <Button onClick={() => handleUpdateEvent(selectEvent.id, selectEvent)} color="primary">
                                    Sửa
                                </Button>
                                <Button onClick={() => handleEventDelete(selectEvent.id)} color="secondary">
                                    Xóa
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog thêm sự kiện */}
            <Dialog maxWidth="sm" fullWidth onClose={handleAddModalClose} open={isAddModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <DialogTitle>Thêm lịch phỏng vấn mới</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Ngày"
                        type="date"
                        fullWidth
                        value={newEvent.date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Giờ bắt đầu"
                        type="time"
                        fullWidth
                        value={newEvent.startTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Giờ kết thúc"
                        type="time"
                        fullWidth
                        value={newEvent.endTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                    <DialogActions>
                        <Button onClick={handleAddModalClose} color="primary">
                            Đóng
                        </Button>
                        <Button onClick={handleCreateNewEvent} color="primary">
                            Thêm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ExpertCalendarPage;

{/* Dialog thêm sự kiện */ }
// <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
//     {isModalOpen && (
//         <AddEventOnExpertCalendar
//             event={selectedEvent}
//             range={selectedRange}
//             onCancel={handleModalClose}
//             handleDelete={handleEventDelete}
//             handleCreate={handleEventCreate}
//             handleUpdate={handleUpdateEvent}
//         />
//     )}
// </Dialog>
