"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { UseGetBookingCustomerFeedbackQuestion } from "hooks/use-get-booking-customer-feedback-question";
import { useRefresh } from "hooks/use-refresh";
import { PostBookingCustomerFeedbackQuestion } from "package/api/booking-customer-feedback-question";
import { DelBookingCustomerFeedbackQuestionById } from "package/api/booking-customer-feedback-question/id";

const feedbackTypes = [
  { value: "text", label: "Dạng văn bản" },
  { value: "number", label: "Dạng số" },
  { value: "rating", label: "Đánh giá" },
  { value: "experience", label: "Trải nghiệm" },
];

function InterviewQuestionList() {
  const { refresh, refreshTime } = useRefresh();

  const { bookingCustomerFeedbackQuestion } =
    UseGetBookingCustomerFeedbackQuestion(refreshTime);

  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [newQuestion, setNewQuestion] = useState({ question: "", type: "" });

  const handleEdit = (id: any) => {
    const question = bookingCustomerFeedbackQuestion.find(
      (q: any) => q.id === id
    );
    if (question) {
      console.log("Edit question:", question);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const res = await DelBookingCustomerFeedbackQuestionById({ id });
      if (res.status !== "success") {
        return;
      }
      refresh();
      setSelectedQuestion(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      if (newQuestion.question === "" || newQuestion.type === "") {
        return;
      }
      const res = await PostBookingCustomerFeedbackQuestion({
        question: newQuestion.question,
        type: newQuestion.type,
        categoryId: 1,
      });
      if (res.status !== "success") {
        return;
      }
      refresh();
      setOpenAddDialog(false);
      setNewQuestion({ question: "", type: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const renderTable = (questions: any) => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 200 }}>Câu hỏi</TableCell>
            <TableCell align="left">Kiểu câu hỏi</TableCell>
            <TableCell align="right"  sx={{ pr: 3 }}>Quản lý</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q: any) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell>
                {feedbackTypes.find((value) => value.value === q.type)?.label}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Sửa">
                  <IconButton onClick={() => handleEdit(q.id)}>
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton onClick={() => setSelectedQuestion(q)}>
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      {renderTable(bookingCustomerFeedbackQuestion)}

      <Dialog
        open={Boolean(selectedQuestion)}
        onClose={() => setSelectedQuestion(null)}
      >
        <DialogTitle>Xác nhận xóa câu hỏi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa câu hỏi{" "}
            <Typography component="span" color="primary">
              {selectedQuestion?.question}
            </Typography>{" "}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedQuestion(null)} color="primary">
            Đóng
          </Button>
          <Button
            onClick={() => handleDelete(selectedQuestion?.id)}
            color="primary"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Thêm câu hỏi</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Câu hỏi"
            fullWidth
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Chọn kiểu câu hỏi</InputLabel>
            <Select
              label="Chọn kiểu câu hỏi"
              value={newQuestion.type}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  type: e.target.value as string,
                })
              }
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
          <Button onClick={handleAddQuestion} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InterviewQuestionList;
