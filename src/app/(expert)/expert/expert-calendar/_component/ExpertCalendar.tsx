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
import AddAlarmTwoToneIcon from '@mui/icons-material/AddAlarmTwoTone';
import { FormikValues } from 'formik';

// project imports
import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import CalendarStyled from 'components/application/calendar/CalendarStyled';
import { useGetAvailability } from 'hooks/use-get-availability';
import { useGetExpertCurrent } from 'hooks/use-get-expert-profile';
import { ExpertToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { useRouter } from 'next/navigation';
import { PostAvailability } from 'package/api/availability';
import { dispatch, useSelector } from 'store';
import { getEvents, removeEvent } from 'store/slices/calendar';
import { DateRange } from 'types';
import Loader from 'ui-component/Loader';
import SubCard from 'ui-component/cards/SubCard';
import ExpertToolbar from './ExpertCalendarToolbar';
import { DelAvailability } from 'package/api/availability/id';

// ==============================|| APPLICATION CALENDAR ||============================== //

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
        // const calendarEl = calendarRef.current;
        // if (calendarEl) {
        //     const calendarApi = calendarEl.getApi();
        //     calendarApi.today();
        //     setDate(calendarApi.getDate());
        // }
    };

    const handleViewChange = (newView: string) => {
        // const calendarEl = calendarRef.current;
        // if (calendarEl) {
        //     const calendarApi = calendarEl.getApi();
        //     calendarApi.changeView(newView);
        //     setView(newView);
        // }
    };

    const handleDatePrev = () => {
        // const calendarEl = calendarRef.current;
        // if (calendarEl) {
        //     const calendarApi = calendarEl.getApi();
        //     calendarApi.prev();
        //     setDate(calendarApi.getDate());
        // }
    };

    const handleDateNext = () => {
        // const calendarEl = calendarRef.current;
        // if (calendarEl) {
        //     const calendarApi = calendarEl.getApi();
        //     calendarApi.next();
        //     setDate(calendarApi.getDate());
        // }
    };

    const handleEventUpdate = async ({ event }: EventResizeDoneArg | EventDropArg) => {
        // try {
        //     dispatch(
        //         updateEvent({
        //             eventId: event.id,
        //             update: {
        //                 allDay: event.allDay,
        //                 start: event.start,
        //                 end: event.end
        //             }
        //         })
        //     );
        // } catch (err) {
        //     console.error(err);
        // }
    };

    // const handleEventDelete = async (id: string) => {
    //     try {
    //         dispatch(removeEvent(id));
    //         handleEditModalClose();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleUpdateEvent = async (eventId: string, update: FormikValues) => {
    };

    // const handleRangeSelect = (arg: DateSelectArg) => {
    //     const calendarEl = calendarRef.current;
    //     if (calendarEl) {
    //         const calendarApi = calendarEl.getApi();
    //         calendarApi.unselect();
    //     }
    //     setSelectedRange({
    //         start: arg.start,
    //         end: arg.end
    //     });
    //     setIsAddModalOpen(true);
    // };

    useEffect(() => {
        dispatch(getEvents()).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        setEvents(calendarState.events);
    }, [calendarState]);

    // // set calendar view
    // useEffect(() => {
    //     handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
    // }, [matchSm]);

    // ==============================|| MY ||============================== //
    // ==============================|| CODE ||============================== //
    // ==============================|| BELOW ||============================== //

    const isTimeOverlap = (newEvent: FormikValues) => {
        return events.some(event =>
            newEvent.date === event.date && (
                (newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
                (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime) ||
                (newEvent.startTime <= event.startTime && newEvent.endTime >= event.endTime)
            )
        );
    };

    const { expertToken } = ExpertToken();

    const { expertCurrent, loading: expertCurrentLoading } = useGetExpertCurrent(
        expertToken,
        refreshTime
    );

    const { availabilities } = useGetAvailability({ expertId: expertCurrent?.expertId ?? 0 });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newEvent, setNewEvent] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });

    const [selectEvent, setSelectEvent] = useState<any>();

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };


    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
        setNewEvent({
            date: '',
            startTime: '',
            endTime: ''
        });
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleRangeSelect = (arg: DateSelectArg) => {
        setIsAddModalOpen(true);
    };

    const handleEventSelect = (arg: EventClickArg) => {
        if (arg) {
            const selectedArg = events.find(data => data.id === arg.event.id);
            const reversedArg = reverseConvertEvents(selectedArg);
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
            refresh();
        } catch (error) {
            throw new Error();
        }
    };

    const handleEventDelete = async (id: string) => {
        try {
            if (id) {
                const res = await DelAvailability({ id: +id }, expertToken);
                console.log("handleEventDelete:", res);
            }
            refresh();
            setIsEditModalOpen(false);
        } catch (error) {
            throw new Error();
        }
    };

    useEffect(() => {
        const convertedEvents = convertEvents(availabilities);
        setEvents(convertedEvents);
    }, [expertCurrent, availabilities, expertToken, refreshTime]);

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
            <Dialog maxWidth="sm" fullWidth onClose={handleEditModalClose} open={isEditModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <DialogTitle color="primary">Xóa lịch phỏng vấn</DialogTitle>
                <DialogContent>
                    {selectEvent && (
                        <>
                            <TextField
                                disabled
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
                                disabled
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
                                disabled
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
                                <Button onClick={handleEditModalClose} color="primary">
                                    Đóng
                                </Button>
                                <Button onClick={() => handleEventDelete(selectEvent.id)} color="error">
                                    Xóa
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog thêm sự kiện */}
            <Dialog maxWidth="sm" fullWidth onClose={handleAddModalClose} open={isAddModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <DialogTitle color="primary">Thêm lịch phỏng vấn mới</DialogTitle>
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
                    <Typography sx={{ fontStyle: 'italic', pt: 1 }}>Lưu ý: SA là sáng, CH là chiều</Typography>
                    <DialogActions>
                        <Button onClick={handleAddModalClose} color="primary">
                            Đóng
                        </Button>
                        <Button onClick={handleCreateNewEvent} color="success">
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
