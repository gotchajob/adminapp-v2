"use client";

import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import AddAlarmTwoToneIcon from "@mui/icons-material/AddAlarmTwoTone";
import { FormikValues } from "formik";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CalendarStyled from "components/application/calendar/CalendarStyled";
import { useGetAvailability } from "hooks/use-get-availability";
import { useGetExpertCurrent } from "hooks/use-get-expert-profile";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useRouter } from "next/navigation";
import {
  PostAvailability,
  PostAvailabilityData,
} from "package/api/availability";
import { DelAvailability } from "package/api/availability/id";
import { dispatch, useSelector } from "store";
import { getEvents } from "store/slices/calendar";
import { DateRange } from "types";
import SubCard from "ui-component/cards/SubCard";
import Loader from "ui-component/Loader";
import ExpertToolbar from "./ExpertCalendarToolbar";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formatDate, getDatesBetween } from "package/util";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { FlexBetween } from "components/common/box/flex-box";
import { StyledLink } from "components/common/link/styled-link";

// ==============================|| APPLICATION CALENDAR ||============================== //

const convertEvents = (data: any) => {
  return data.map((event: any) => ({
    id: event.id.toString(),
    title: event.status === 2 ? "Đã đặt lịch" : "Chưa đặt lịch",
    color: event.status === 2 ? "#697586" : "#00E676",
    status: event.status,
    start: event.startTime,
    end: event.endTime,
  }));
};

const reverseConvertEvents = (event: any) => {
  return {
    id: event.id.toString(),
    date: event.start.slice(0, 10),
    start: event.start.slice(11, 19),
    end: event.end.slice(11, 19),
    status: event.status,
  };
};

const ExpertCalendarPage = ({ onNext }: { onNext: () => void }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const route = useRouter();
  const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FormikValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<FormikValues[]>([]);
  const calendarState = useSelector((state) => state.calendar);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(matchSm ? "listWeek" : "dayGridMonth");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

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

  const handleEventUpdate = async ({
    event,
  }: EventResizeDoneArg | EventDropArg) => {
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

  const handleUpdateEvent = async (eventId: string, update: FormikValues) => {};

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

  // useEffect(() => {
  //     setEvents(calendarState.events);
  // }, [calendarState]);

  // // set calendar view
  // useEffect(() => {
  //     handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
  // }, [matchSm]);

  // ==============================|| MY ||============================== //
  // ==============================|| CODE ||============================== //
  // ==============================|| BELOW ||============================== //

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [endDate, setEndDate] = useState<Date | null>(null);

  const [datesBetween, setDatesBetween] = useState<Date[]>([]);

  const { refresh, refreshTime } = useRefresh();

  const { expertToken } = ExpertToken();

  const { expertCurrent, loading: expertCurrentLoading } = useGetExpertCurrent(
    expertToken,
    refreshTime
  );

  const { availabilities, loading: availabilitiesLoadings } =
    useGetAvailability(
      { expertId: expertCurrent ? expertCurrent.expertId : 0 },
      refreshTime
    );

  const [isAddDateRangeOpen, setIsAddDateRangeOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newEvent, setNewEvent] = useState<PostAvailabilityData>();

  const [selectEvent, setSelectEvent] = useState<any>();

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
    setSelectedRange(null);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewEvent({
      date: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleRangeSelect = (arg: DateSelectArg) => {
    if (arg) {
      setNewEvent({
        date: arg.startStr,
        startTime: "",
        endTime: "",
      });
    }
    setIsAddModalOpen(true);
  };

  const handleAddDateRangeOpen = () => {
    setIsAddDateRangeOpen(true);
  };

  const handleEventSelect = (arg: EventClickArg) => {
    // if (arg.event._def.extendedProps.status !== 1) {
    //   return;
    // }
    if (arg) {
      const selectedArg = events.find((data) => data.id === arg.event.id);
      console.log(selectedArg);
      const reversedArg = reverseConvertEvents(selectedArg);
      setSelectEvent(reversedArg);
      setIsEditModalOpen(true);
    }
  };

  const handleCreateNewEvent = async () => {
    setLoadingButton(true);
    try {
      if (newEvent) {
        const res = await PostAvailability(
          {
            request: [
              {
                date: newEvent.date,
                startTime: newEvent.startTime,
                endTime: newEvent.endTime,
              },
            ],
          },
          expertToken
        );
        if (res.status !== "success") {
          throw new Error(res.responseText);
        }
      }
      enqueueSnackbar("Thêm lịch thành công", { variant: "success" });
      setIsAddModalOpen(false);
      refresh();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleCreateDateRange = async () => {
    setLoadingButton(true);
    if (!startDate || !endDate || !newEvent?.startTime || !newEvent?.endTime) {
      console.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const datesArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const dateString = formatDate(currentDate.toISOString(), "yyyy-MM-dd");
      datesArray.push({
        date: dateString,
        startTime: newEvent?.startTime,
        endTime: newEvent?.endTime,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    try {
      if (!datesArray) {
        return;
      }
      if (datesArray) {
        const res = await PostAvailability(
          { request: datesArray },
          expertToken
        );
        if (res.status !== "success") {
          throw new Error(res.responseText);
        }
      }
      enqueueSnackbar("Thêm lịch phỏng vấn thành công", { variant: "success" });
      setIsAddDateRangeOpen(false);
      refresh();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleEventDelete = async (id: string) => {
    try {
      if (id) {
        const res = await DelAvailability({ id: +id }, expertToken);
        if (res.status !== "success") {
          throw new Error(res.responseText);
        }
      }
      enqueueSnackbar("Xóa lịch phỏng vấn thành công", { variant: "success" });
      setIsEditModalOpen(false);
      refresh();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      try {
        const dates = getDatesBetween([startDate, endDate]);
        setDatesBetween(dates);
      } catch (error: any) {
        console.error("Lỗi khi tính toán các ngày giữa:", error);
        enqueueSnackbar("Lỗi khi tính toán các ngày giữa:", {
          variant: "error",
        });
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    // console.log("availabilities:", availabilities);
    const convertedEvents = convertEvents(availabilities);
    setEvents(convertedEvents);
  }, [expertCurrent, availabilities, expertToken, refreshTime]);

  useEffect(() => {
    console.log("select Event:", selectEvent);
  }, [selectEvent]);

  if (loading) return <Loader />;

  return (
    <Box px={2} py={1}>
      <CalendarStyled>
        <FlexBetween>
          <StyledLink target="_blank" href={"https://gotchajob.vn/policy/dang-ki-expert"}>
            <Typography fontSize={15} sx={{ textDecoration: "underline" }}>
              Tôi đồng ý với các điều khoản sử dụng
            </Typography>
          </StyledLink>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddDateRangeOpen}
          >
            <AddAlarmTwoToneIcon fontSize="small" sx={{ mr: 0.75 }} />
            Thêm nhiều lịch phỏng vấn
          </Button>
        </FlexBetween>
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
            editable={false}
            droppable={false}
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
            height={matchSm ? "auto" : 720}
            plugins={[
              listPlugin,
              dayGridPlugin,
              timelinePlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
          />
        </SubCard>
      </CalendarStyled>

      {/* Dialog thêm khoảng ngày */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={() => setIsAddDateRangeOpen(false)}
        open={isAddDateRangeOpen}
        sx={{ "& .MuiDialog-paper": { p: 2 } }}
      >
        <DialogTitle color="primary">Thêm nhiều lịch phỏng vấn</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disablePast
                  slotProps={{ textField: { fullWidth: true } }}
                  label="Từ ngày"
                  value={startDate}
                  onChange={(newValue: Date | null) => {
                    setStartDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disablePast
                  slotProps={{ textField: { fullWidth: true } }}
                  label="Đến ngày"
                  value={endDate}
                  onChange={(newValue: Date | null) => {
                    setEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={12}>
              <TextField
                margin="dense"
                label="Giờ bắt đầu"
                type="time"
                fullWidth
                value={newEvent?.startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  //@ts-ignore
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                margin="dense"
                label="Giờ kết thúc"
                type="time"
                fullWidth
                value={newEvent?.endTime}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  //@ts-ignore
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontStyle: "italic", pt: 1 }}>
                Lưu ý: SA là sáng, CH là chiều
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDateRangeOpen(false)} color="primary">
            Đóng
          </Button>
          <Button onClick={handleCreateDateRange} color="success">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xóa sự kiện */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleEditModalClose}
        open={isEditModalOpen}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        <DialogTitle color="primary">
          {" "}
          {selectEvent?.status == 2
            ? "Thông tin buổi phỏng vấn"
            : "Xóa lịch phỏng vấn"}
        </DialogTitle>
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
                onChange={(e) =>
                  setSelectEvent({ ...selectEvent, date: e.target.value })
                }
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
                onChange={(e) =>
                  setSelectEvent({ ...selectEvent, start: e.target.value })
                }
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
                onChange={(e) =>
                  setSelectEvent({ ...selectEvent, end: e.target.value })
                }
              />
              <Typography sx={{ fontStyle: "italic", pt: 1 }}>
                Lưu ý: SA là sáng, CH là chiều
              </Typography>
              <DialogActions>
                <Button onClick={handleEditModalClose} color="primary">
                  Đóng
                </Button>
                {selectEvent.status !== 2 && (
                  <LoadingButton
                    onClick={() => handleEventDelete(selectEvent.id)}
                    color="error"
                    loading={loadingButton}
                  >
                    Xóa
                  </LoadingButton>
                )}
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog thêm sự kiện */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleAddModalClose}
        open={isAddModalOpen}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        <DialogTitle color="primary">Thêm lịch phỏng vấn mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Ngày"
            type="date"
            fullWidth
            value={newEvent?.date}
            InputLabelProps={{
              shrink: true,
            }}
            //@ts-ignore
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Giờ bắt đầu"
            type="time"
            fullWidth
            value={newEvent?.startTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              //@ts-ignore
              setNewEvent({ ...newEvent, startTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Giờ kết thúc"
            type="time"
            fullWidth
            value={newEvent?.endTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              //@ts-ignore
              setNewEvent({ ...newEvent, endTime: e.target.value })
            }
          />
          <Typography sx={{ fontStyle: "italic", pt: 1 }}>
            Lưu ý: SA là sáng, CH là chiều
          </Typography>
          <DialogActions>
            <Button onClick={handleAddModalClose} color="primary">
              Đóng
            </Button>
            <LoadingButton
              onClick={handleCreateNewEvent}
              color="success"
              loading={loadingButton}
            >
              Thêm
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ExpertCalendarPage;

{
  /* Dialog thêm sự kiện */
}
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
