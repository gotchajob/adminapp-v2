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

const feedbackTypes = [
  { value: "text", label: "Dạng văn bản" },
  { value: "number", label: "Dạng số" },
  { value: "rating", label: "Đánh giá" },
  { value: "experience", label: "Trải nghiệm" },
];

function InterviewQuestionList() {
  const { refresh, refreshTime } = useRefresh();
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
  const handleDelete = async (question: any) => {
    try {
      const res = await DelBookingCustomerFeedbackQuestionById({ id: question.id });
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
        });
        if (res.status !== "success") {
          enqueueSnackbar("Cập nhật câu hỏi thất bại", { variant: "error" });
          return;
        }
      } else {
        // Chế độ thêm mới
        const res = await PostBookingCustomerFeedbackQuestion({
          question: newQuestion.question,
          type: newQuestion.type,
          categoryId: 1,
        });
        if (res.status !== "success") {
          enqueueSnackbar("Thêm câu hỏi thất bại", { variant: "error" });
          return;
        }
      }
      refresh();
      setOpenAddDialog(false);
      setNewQuestion({ question: "", type: "" });
      setEditMode(false);
      setSelectedQuestionForEdit(null);
    } catch (error) {
      enqueueSnackbar("Lỗi khi xử lý câu hỏi", { variant: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("bookingCustomerFeedbackQuestion", bookingCustomerFeedbackQuestion);
  }, [bookingCustomerFeedbackQuestion]);

  return (
    <>
      {bookingCustomerFeedbackQuestion && (
        <InterviewQuestionTableRender
          bookingCustomerFeedbackQuestion={bookingCustomerFeedbackQuestion}
          handleEdit={handleEdit}
          handleDelete={(id) => setSelectedQuestionForDelete(id)}
          setOpenAddDialog={setOpenAddDialog}
        />
      )}

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
