"use client";

import Box from '@mui/material/Box';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { UseGetBookingCustomerFeedback } from 'hooks/use-get-booking-customer-feedback';
import { UseGetBookingCustomerFeedbackQuestion } from 'hooks/use-get-booking-customer-feedback-question';
import { UseGetBookingExpertFeedbackQuestion } from 'hooks/use-get-booking-expert-feedback-question';
import { DelBookingExpertFeedbackQuestionById } from 'package/api/booking-expert-feedback-question-controller/id';
import { DelBookingCustomerFeedbackQuestionById } from 'package/api/booking-customer-feedback-question-controller/id';
import { useRefresh } from 'hooks/use-refresh';
import { PostBookingCustomerFeedbackQuestion } from 'package/api/booking-customer-feedback-question-controller';


function InterviewQuestionPage() {

    const { refresh, refreshTime } = useRefresh();

    const [open, setOpen] = useState(false);

    const { bookingCustomerFeedbackQuestion } = UseGetBookingCustomerFeedbackQuestion(refreshTime);

    const [newQuestion, setNewQuestion] = useState('');

    const { bookingExpertFeedbackQuestion } = UseGetBookingExpertFeedbackQuestion();

    const questionMap = useMemo(() => {
        const map = new Map();
        bookingCustomerFeedbackQuestion.forEach((question: any) => {
            map.set(question.id, question);
        });
        bookingExpertFeedbackQuestion.forEach((question: any) => {
            map.set(question.id, question);
        });
        return map;
    }, [bookingCustomerFeedbackQuestion, bookingExpertFeedbackQuestion]);

    const handleEdit = (id: any) => {
        const question = questionMap.get(id);
        if (question) {
            console.log('Edit', question);
        } else {
            console.log('Question not found');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async (id: any) => {
        const question = questionMap.get(id);
        if (!question) {
            return;
        }
        try {
            const res = await DelBookingCustomerFeedbackQuestionById({ id: question.id });
            if (res.status !== "success") {
                return
            }
            refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddQuestion = async () => {
        console.log("Added Question:", newQuestion);
        try {
            const res = await PostBookingCustomerFeedbackQuestion({
                question: newQuestion,
                type: "string",
                categoryId: 1
            });
            if (res.status !== "success") {
                return;
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
        setNewQuestion('');
    };

    useEffect(() => {
        console.log("bookingCustomerFeedbackQuestion :", bookingCustomerFeedbackQuestion);
        console.log("bookingExpertFeedbackQuestion :", bookingExpertFeedbackQuestion);
    }, [bookingCustomerFeedbackQuestion, bookingExpertFeedbackQuestion]);

    const renderTable = (questions: any) => (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>Câu hỏi</TableCell>
                        <TableCell>Quản lý</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((q: any) => (
                        <TableRow key={q.id}>
                            <TableCell>{q.question}</TableCell>
                            <TableCell>
                                <Tooltip title="Sửa">
                                    <IconButton onClick={() => handleEdit(q.id)} >
                                        <EditIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa">
                                    <IconButton onClick={() => handleDelete(q.id)} >
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
        <Box sx={{ width: "100%", background: "#FFFFFF", p: 3, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Quản lý Câu hỏi phỏng vấn và feedback</Typography>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={["interviewQuestions", "feedbackQuestions"]}
                sx={{
                    '& .MuiTreeItem-root': {
                        margin: '8px 0',
                        '& .MuiTreeItem-content': {
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        },
                        '& .MuiTreeItem-label': {
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        },
                    },
                }}
            >
                <TreeItem nodeId="feedbackQuestions" label="Câu hỏi feedback buổi phỏng vấn" sx={{ color: '#b39ddb' }}>
                    <TreeItem nodeId='customerFeedback' label={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>Feedback từ người dùng</Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setOpen(true)}
                                sx={{ ml: 2 }}
                            >
                                Thêm câu hỏi
                            </Button>
                        </Box>
                    }>
                        {renderTable(bookingCustomerFeedbackQuestion)}
                    </TreeItem>
                    <TreeItem nodeId='expertFeedback' label="Feedback từ chuyên gia">
                        {renderTable(bookingExpertFeedbackQuestion)}
                    </TreeItem>
                </TreeItem>
            </TreeView>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Thêm câu hỏi feedback mới cho người dùng</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Câu hỏi"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Hủy</Button>
                    <Button onClick={handleAddQuestion}>Thêm</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default InterviewQuestionPage;
