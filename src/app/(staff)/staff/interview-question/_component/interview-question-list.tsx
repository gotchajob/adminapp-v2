"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { UseGetBookingCustomerFeedbackQuestion } from "hooks/use-get-booking-customer-feedback-question";
import { useRefresh } from "hooks/use-refresh";
import { enqueueSnackbar } from "notistack";
import { PostBookingCustomerFeedbackQuestion } from "package/api/booking-customer-feedback-question";
import { DelBookingCustomerFeedbackQuestionById } from "package/api/booking-customer-feedback-question/id";
import { PatchBookingCustomerFeedbackQuestionById } from "package/api/booking-customer-feedback-question/id";
import { useEffect, useState } from "react";
import { InterviewQuestionTableRender } from "./InterviewQuestionTable";
import { StaffToken } from "hooks/use-login";

const feedbackTypes = [
  { value: "text", label: "Dạng văn bản" },
  { value: "number", label: "Dạng số" },
  { value: "rating", label: "Đánh giá" },
  { value: "experience", label: "Trải nghiệm" },
];

function InterviewQuestionList() {
  const { refresh, refreshTime } = useRefresh();
  const { staffToken } = StaffToken();
  const { bookingCustomerFeedbackQuestion } = UseGetBookingCustomerFeedbackQuestion(refreshTime);
  // Trạng thái riêng biệt cho thao tác sửa và xóa
  const [selectedQuestionForEdit, setSelectedQuestionForEdit] = useState<any>(null);
  const [selectedQuestionForDelete, setSelectedQuestionForDelete] = useState<any>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: "", type: "" });
  const [editMode, setEditMode] = useState(false);

  // Hàm xử lý chỉnh sửa câu hỏi
  const handleEdit = (id: any) => {
    const question = bookingCustomerFeedbackQuestion.find((q: any) => q.id === id);
    if (question) {
      setSelectedQuestionForEdit(question);
      setNewQuestion({ question: question.question, type: question.type });
      setOpenAddDialog(true);
      setEditMode(true);
    }
  };

  // Hàm xử lý xóa câu hỏi
  const handleDelete = async (id: number) => {
    try {
      const res = await DelBookingCustomerFeedbackQuestionById({ id: selectedQuestionForDelete }, staffToken);
      if (res.status !== "success") {
        enqueueSnackbar("Xóa câu hỏi thất bại", { variant: "error" });
        return;
      }
      refresh();
      setSelectedQuestionForDelete(null);
      enqueueSnackbar("Xóa câu hỏi thành công", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Lỗi khi xóa câu hỏi", { variant: "error" });
      console.error(error);
    }
  };

  const handleAddOrUpdateQuestion = async () => {
    try {
      if (newQuestion.question === "" || newQuestion.type === "") {
        enqueueSnackbar("Vui lòng điền đầy đủ thông tin", { variant: "warning" });
        return;
      }
      if (editMode) {
        const res = await PatchBookingCustomerFeedbackQuestionById({
          id: selectedQuestionForEdit.id,
          question: newQuestion.question,
          type: newQuestion.type,
        }, staffToken);
        if (res.status !== "success") {
          enqueueSnackbar("Cập nhật câu hỏi thất bại", { variant: "error" });
          return;
        }
        enqueueSnackbar("Cập nhật câu hỏi thành công", { variant: "success" });
      } else {
        // Chế độ thêm mới
        const res = await PostBookingCustomerFeedbackQuestion({
          question: newQuestion.question,
          type: newQuestion.type,
          categoryId: 1,
        }, staffToken);
        if (res.status !== "success") {
          enqueueSnackbar("Thêm câu hỏi thất bại", { variant: "error" });
          return;
        }
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi xử lý câu hỏi", { variant: "error" });
      console.error(error);
    } finally {
      refresh();
      setOpenAddDialog(false);
      setNewQuestion({ question: "", type: "" });
      setEditMode(false);
      setSelectedQuestionForEdit(null);
    }
  };

  useEffect(() => {
    console.log("bookingCustomerFeedbackQuestion", bookingCustomerFeedbackQuestion);
  }, [bookingCustomerFeedbackQuestion]);

  const SkeletonTable = () => {
    return (
      <TableContainer>
        <Skeleton variant="rectangular" width="15%" sx={{ margin: 3 }} />
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {Array.from(new Array(5)).map((_, index) => (
                <TableCell key={index} sx={{ padding: 2, border: 0 }} width="30%">
                  <Skeleton variant="rectangular" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(5)).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from(new Array(5)).map((_, cellIndex) => (
                  <TableCell key={cellIndex} width="30%" sx={{ padding: 2, border: 0 }}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


  return (
    <>
      {bookingCustomerFeedbackQuestion.length > 0 ? (
        <InterviewQuestionTableRender
          bookingCustomerFeedbackQuestion={bookingCustomerFeedbackQuestion}
          handleEdit={handleEdit}
          handleDelete={(id) => setSelectedQuestionForDelete(id)}
          setOpenAddDialog={setOpenAddDialog}
        />
      ) : (SkeletonTable())}

      {/* Xác nhận xóa câu hỏi */}
      <Dialog
        open={Boolean(selectedQuestionForDelete)}
        onClose={() => setSelectedQuestionForDelete(null)}
      >
        <DialogTitle>Xác nhận xóa câu hỏi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa câu hỏi{" "}
            <Typography component="span" color="primary">
              {selectedQuestionForDelete?.question}
            </Typography>{" "}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedQuestionForDelete(null)} color="primary">
            Đóng
          </Button>
          <Button
            onClick={() => handleDelete(selectedQuestionForDelete?.id)}
            color="primary"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Thêm và chỉnh sửa câu hỏi */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>{editMode ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Câu hỏi"
            fullWidth
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Chọn kiểu câu hỏi</InputLabel>
            <Select
              label="Chọn kiểu câu hỏi"
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value as string })}
              sx={{ mb: 2 }}
            >
              {feedbackTypes.map((type, index) => (
                <MenuItem value={type.value} key={index}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Đóng
          </Button>
          <Button onClick={handleAddOrUpdateQuestion} color="primary">
            {editMode ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InterviewQuestionList;
