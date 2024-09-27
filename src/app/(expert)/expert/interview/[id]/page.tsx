"use client";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  styled,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FlexBox, FlexCenter } from "components/common/box/flex-box";
import { Answer } from "components/common/feedback/answer";
import { Feedback } from "components/common/feedback/question";
import { ReadOnlyAnswer } from "components/common/feedback/read-only-answer";
import { Text } from "components/common/text/text";
import { useGetBookingById } from "hooks/use-get-booking";
import { UseGetBookingExpertFeedbackByBooking } from "hooks/use-get-booking-expert-feedback";
import { UseGetBookingExpertFeedbackQuestion } from "hooks/use-get-booking-expert-feedback-question";
import { UseGetExpertQuestionCategoryCurrent } from "hooks/use-get-expert-question-category";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {
  BookingFeedbackAnwer,
  PostBookingExpertFeedback,
} from "package/api/booking-expert-feedback-controller";
import { BookingExpertFeedbackQuestion } from "package/api/booking-expert-feedback-question";
import { PatchBookingCancelByExpert } from "package/api/booking/id/cancel-by-expert";
import { PatchBookingReject } from "package/api/booking/id/reject";
import { formatDate } from "package/util";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import Avatar from "ui-component/extended/Avatar";

const getStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return { label: "Chờ xác nhận của chuyên gia", color: "warning" };
    case 2:
      return { label: "Chờ phỏng vấn", color: "info" };
    case 3:
      return { label: "Đang phỏng vấn", color: "primary" };
    case 4:
      return { label: "Chờ phản hồi", color: "default" };
    case 5:
      return { label: "Hoàn thành", color: "success" };
    case 6:
      return { label: "Hủy bởi khách hàng", color: "error" };
    case 7:
      return { label: "Hủy bởi chuyên gia", color: "error" };
    case 8:
      return { label: "Đã bị report", color: "error" };
    default:
      return { label: "Trạng thái không xác định", color: "default" };
  }
};

interface MappedSkill {
  skill: string;
  skillOption: string[];
}

const StyledChip = styled(Chip)({
  color: "white",
  borderRadius: 10,
  minWidth: "100px",
});
export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const route = useRouter();

  const { refresh, refreshTime } = useRefresh();

  const [open, setOpen] = useState(false);

  const [cancelReason, setCancelReason] = useState("");

  const [isCanceling, setIsCanceling] = useState(false);

  const [comment, setComment] = useState<string>("");

  const { expertToken } = ExpertToken();

  const { bookingExpertFeedbackByBooking } =
    UseGetBookingExpertFeedbackByBooking(
      { bookingId: +params.id },
      refreshTime
    );

  const { booking } = useGetBookingById({ id: +params.id });

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { bookingExpertFeedbackQuestion } =
    UseGetBookingExpertFeedbackQuestion(refreshTime);

  const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(
    expertToken,
    refreshTime
  );

  useEffect(() => {
    console.log(booking);
  }, [booking]);

  const [selectFeedbackQuestionList, setSelectAddFeedbackQuestion] = useState<
    BookingExpertFeedbackQuestion[]
  >([]);

  const [answerList, setAnswerList] = useState<BookingFeedbackAnwer[]>([]);

  const handleGradeSubmission = async () => {
    if (!answerList) {
      return;
    }
    setLoadingSubmit(true);
    try {
      if (!expertToken) {
        throw new Error("Cần đăng nhập");
      }
      const res = await PostBookingExpertFeedback(
        { bookingId: +params.id, comment, answerList },
        expertToken
      );
      if (res.status !== "success") {
        throw new Error();
      }
      enqueueSnackbar("Đánh giá ứng viên thành công", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Đánh giá ứng viên thất bại", { variant: "error" });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCancelBooking = async () => {
    setIsCanceling(false);
    try {
      if (!booking) {
        return;
      }
      if (booking.status === 1) {
        const res = await PatchBookingReject(
          { id: +params.id, reason: cancelReason },
          expertToken
        );
        if (res.status !== "success") {
          throw new Error(res.responseText);
        }
        enqueueSnackbar("Hủy đặt lịch thành công", { variant: "success" });
      } else if (booking.canCancel) {
        const res = await PatchBookingCancelByExpert(
          { id: +params.id, reason: cancelReason },
          expertToken
        );
        if (res.status !== "success") {
          throw new Error(res.responseText);
        }
        enqueueSnackbar("Hủy đặt lịch thành công", { variant: "success" });
      }
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const mappedExpertSkillOption = () => {
    const mappedSkill: MappedSkill[] = [];

    if (booking) {
      booking.skillOptionBooking.forEach((e: any) => {
        const index = mappedSkill.findIndex((v) => v.skill === e.skillName);
        if (index > -1) {
          mappedSkill[index].skillOption.push(e.skillOptionName);
        } else {
          mappedSkill.push({
            skill: e.skillName,
            skillOption: [e.skillOptionName],
          });
        }
      });
    }

    return (
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: "0",
            left: 0,
            width: "0.5px",
            height: "100%",
            bgcolor: "divider",
            zIndex: "1",
          },
        }}
      >
        {mappedSkill.map((value, index) => (
          <Stack
            ml={3}
            my={2}
            key={index}
            direction={"row"}
            spacing={3}
            alignItems={"center"}
          >
            <StyledChip label={value.skill} color="warning" />
            <Text>:</Text>
            {value.skillOption.map((data, index) => (
              <StyledChip label={data} key={index} color="info" />
            ))}
          </Stack>
        ))}
      </Box>
    );
  };

  useEffect(() => {
    console.log("booking:", booking);
  }, [booking]);

  return (
    <MainCard>
      {booking && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2}>
                  <Typography variant="h4">Thông tin khách hàng</Typography>
                  <Stack spacing={1}>
                    <FlexBox>
                      <Avatar
                        alt="User 1"
                        src={
                          booking.customerInfo
                            ? booking.customerInfo.avatar
                            : ""
                        }
                      />
                      <Typography variant="body2" ml={1}>
                        {booking.customerInfo?.fullName}
                      </Typography>
                    </FlexBox>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1">Email :</Typography>
                      <Typography variant="body2">
                        {booking.customerInfo?.email}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2}>
                  <Typography variant="h4">Thông tin đặt lịch</Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1">
                        Thời gian bắt đầu:
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(
                          booking?.startInterviewDate,
                          "yyyy-MM-dd hh:mm"
                        )}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1">
                        Thời gian kết thúc:
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(
                          booking?.endInterviewDate,
                          "yyyy-MM-dd hh:mm"
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="h4">CV khách hàng</Typography>
              <FlexCenter
                onClick={handleClickOpen}
                sx={{ cursor: "pointer" }}
                width={"100%"}
              >
                {booking && (<Image
                  src={booking.customerCv?.image || "https://th.bing.com/th/id/R.97b7aabdda0bb17d06b0bfe4676c4bd8?rik=LR3rS6Yr98kBfA&pid=ImgRaw&r=0"}
                  alt="Customer CV"
                  width={700}
                  height={1000}
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                />)}
              </FlexCenter>

              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogContent>
                  {booking && (<Image
                    src={
                      booking.customerCv?.image ||
                      "https://th.bing.com/th/id/R.97b7aabdda0bb17d06b0bfe4676c4bd8?rik=LR3rS6Yr98kBfA&pid=ImgRaw&r=0"
                    }
                    alt="Customer CV"
                    layout="intrinsic"
                    width={700}
                    height={1000}
                    objectFit="cover"
                    objectPosition="top"
                    style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                  />)}
                </DialogContent>
              </Dialog>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} minHeight={100}>
              <Typography variant="h4">Thông tin tư vấn</Typography>
              {mappedExpertSkillOption()}
              <SubCard
                title="Chú thích của khách hàng"
                sx={{ boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                <TextField
                  multiline
                  minRows={3}
                  value={booking.note}
                  fullWidth
                  disabled
                ></TextField>
              </SubCard>
            </Stack>
          </Grid>
          {(booking.status === 3 || booking.status === 4) && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={3} minHeight={100}>
                  <Typography variant="h4">Câu hỏi phỏng vấn</Typography>
                  <Answer
                    answerList={answerList}
                    feedbackQuestionList={selectFeedbackQuestionList}
                    setAnswerList={setAnswerList}
                  />
                  <Feedback
                    feedbackQuestionList={bookingExpertFeedbackQuestion}
                    feedbackQuestionType={expertQuestionCategoryCurrent}
                    selectFeedbackQuestionList={selectFeedbackQuestionList}
                    setSelectAddFeedbackQuestion={setSelectAddFeedbackQuestion}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <SubCard
                  title="Đánh giá chung về ứng viên"
                  sx={{ boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  <TextField
                    multiline
                    rows={3}
                    value={bookingExpertFeedbackByBooking?.comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                    fullWidth
                  ></TextField>
                </SubCard>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGradeSubmission}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                  disabled={loadingSubmit}
                >
                  {loadingSubmit ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Chấm điểm"
                  )}
                </Button>
              </Grid>
            </>
          )}
          {booking.status === 5 && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={3} minHeight={100}>
                  <Typography variant="h4">Câu hỏi phỏng vấn</Typography>
                  <ReadOnlyAnswer
                    answerList={bookingExpertFeedbackByBooking.answer}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <SubCard
                  title="Đánh giá chung về ứng viên"
                  sx={{ boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  <TextField
                    multiline
                    rows={3}
                    value={bookingExpertFeedbackByBooking?.comment}
                    fullWidth
                    disabled
                  ></TextField>
                </SubCard>
              </Grid>
            </>
          )}
          {booking && booking.status === 7 && (
            <Grid item xs={12}>
              <SubCard
                title="Lý do từ chối của bạn"
                sx={{ boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                <TextField
                  multiline
                  rows={3}
                  value={booking.rejectReason}
                  fullWidth
                  disabled
                ></TextField>
              </SubCard>
            </Grid>
          )}
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              mt={4}
            >
              <Button
                variant="outlined"
                onClick={() => route.push("/expert/booking-calendar")}
              >
                Quay lại
              </Button>
              {booking && booking.canCancel && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsCanceling(!isCanceling)}
                >
                  Hủy đặt lịch
                </Button>
              )}
            </Stack>
          </Grid>
          {isCanceling && (
            <Grid item xs={12} mt={3}>
              <TextField
                label="Lý do"
                multiline
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                fullWidth
              />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={2}
              >
                <Button
                  variant="outlined"
                  onClick={() => setIsCanceling(false)}
                >
                  Đóng
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCancelBooking}
                >
                  Xác nhận
                </Button>
              </Stack>
            </Grid>
          )}
        </Grid>
      )}
    </MainCard>
  );
}
