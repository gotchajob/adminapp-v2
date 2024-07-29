"use client";
// material-ui
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// project imports
import { format } from "date-fns";
import { gridSpacing } from "store/constant";
import SubCard from "ui-component/cards/SubCard";
import Chip from "ui-component/extended/Chip";

// assets
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

// types
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { StyledLink } from "components/common/link/styled-link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useGetBookingById } from "hooks/use-get-booking";
import { useGetExpertSkillOptions } from "hooks/use-get-expert-skill-option";
import { formatDate } from "package/util";
import { ExpertSkillOption } from "package/api/expert-skill-option";
import { PatchBookingReject } from "package/api/booking/id/reject";
import { ExpertToken } from "hooks/use-login";
import { Answer } from "components/common/feedback/answer";
import {
  FeedbackQuestion,
  SampleFeedbackQuestion,
  FeedbackQuestionType,
  SampleFeedbackType,
  FeedbackAnwer,
} from "components/common/feedback/interface";
import { Feedback } from "components/common/feedback/question";
import { FlexBox, FlexCenter } from "components/common/box/flex-box";
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
      return { label: "Từ chối", color: "error" };
    default:
      return { label: "Trạng thái không xác định", color: "default" };
  }
};

const BookingDetailPage = ({
  event,
  onBack,
  params,
}: {
  event: any;
  onBack: () => void;
  params: { id: string };
}) => {
  const [open, setOpen] = useState(false);

  const { expertToken } = ExpertToken();

  const { booking } = useGetBookingById({ id: +params.id });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [feedbackQuestionList] = useState<FeedbackQuestion[]>(
    SampleFeedbackQuestion
  );
  const [feedbackQuestionType] =
    useState<FeedbackQuestionType[]>(SampleFeedbackType);
    
  const [selectFeedbackQuestionList, setSelectAddFeedbackQuestion] = useState<
    FeedbackQuestion[]
  >([]);

  const [answerList, setAnswerList] = useState<FeedbackAnwer[]>([]);

  return (
    <SubCard>
      {booking && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2}>
                  <Typography variant="h4">Thông tin khách hàng</Typography>
                  <Stack spacing={1}>
                    <FlexBox>
                      <Avatar alt="User 1"  src={booking.customerInfo.avatar} />
                      <Typography variant="body2" ml={1}>
                        {booking.customerInfo.fullName}
                      </Typography>
                    </FlexBox>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1">Email :</Typography>
                      <Typography variant="body2">
                        {booking.customerInfo.email}
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
                          booking.startInterviewDate,
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
                          booking.endInterviewDate,
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
                <Image
                  src={
                    "https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"
                  }
                  alt="Customer CV"
                  width={700}
                  height={1000}
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                />
              </FlexCenter>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} minHeight={100}>
              <Typography variant="h4">Thông tin tư vấn</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} minHeight={100}>
              <Typography variant="h4">Câu hỏi phỏng vấn</Typography>

              <Answer
                answerList={answerList}
                feedbackQuestionList={selectFeedbackQuestionList}
                setAnswerList={setAnswerList}
              />
            </Stack>
            <Feedback
              feedbackQuestionList={feedbackQuestionList}
              feedbackQuestionType={feedbackQuestionType}
              selectFeedbackQuestionList={selectFeedbackQuestionList}
              setSelectAddFeedbackQuestion={setSelectAddFeedbackQuestion}
            />
          </Grid>
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <Image
            src={
              "https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"
            }
            alt="Customer CV"
            layout="intrinsic"
            width={700}
            height={1000}
            objectFit="cover"
            objectPosition="top"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          />
        </DialogContent>
      </Dialog>
    </SubCard>
  );
};

export default BookingDetailPage;
