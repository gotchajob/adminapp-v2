"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SubCard from 'ui-component/cards/SubCard';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UseGetExpertQuestionCategory, UseGetExpertQuestionCategoryCurrent } from 'hooks/use-get-expert-question-category';
import { useRefresh } from 'hooks/use-refresh';
import { UseGetBookingExpertFeedbackQuestion } from 'hooks/use-get-booking-expert-feedback-question';
import { ExpertToken } from 'hooks/use-login';
import { DelBookingExpertFeedbackQuestionById } from 'package/api/booking-expert-feedback-question-controller/id';
import { accessToken } from 'mapbox-gl';
import { QuestionCategoryById } from 'package/api/expert-question-category/id';
import { BookingExpertFeedbackQuestion, PostBookingExpertFeedbackQuestion } from 'package/api/booking-expert-feedback-question-controller';
import { PostExpertQuestionCategory } from 'package/api/expert-question-category';
import { expertTypeInputList } from 'components/common/feedback/interface';

function CategoryTable({ refresh, refreshTime, token }: { refresh: () => void, refreshTime: number, token: string }) {

    const { expertToken } = ExpertToken();

    const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(expertToken, refreshTime);

    const [selectedCategory, setSelectedCategory] = useState<QuestionCategoryById | null>(null);

    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [newCategory, setNewCategory] = useState({ category: '', description: '' });

    const [categoryStatus, setCategoryStatus] = useState<{ [key: number]: boolean }>({});

    const handleEdit = (data: any) => {
        console.log('Edit category:', data);
    };

    const handleSelect = (data: QuestionCategoryById) => {
        setSelectedCategory(data);
    };

    const handleConfirmDelete = async () => {
        if (selectedCategory) {
            console.log('Delete category:', selectedCategory);
            refresh();
            setSelectedCategory(null);
        }
    };

    const handleStatusChange = (category: QuestionCategoryById) => {
        setCategoryStatus(prev => ({ ...prev, [category.id]: !prev[category.id] }));
    };

    const handleAddCategory = async () => {
        console.log('Add category:', newCategory);
        try {
            if (newCategory.category == "" || newCategory.description == "") {
                return;
            }
            const res = await PostExpertQuestionCategory({ category: newCategory.category, description: newCategory.description }, token);
            if (res.status !== "success") {
                return;
            }
            refresh();
            setOpenAddDialog(false);
            setNewCategory({ category: '', description: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SubCard
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" color="primary">Quản lí danh mục câu hỏi</Typography>
                        <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
                            Thêm danh mục
                        </Button>
                    </Box>
                }
                sx={{ mb: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Danh mục</TableCell>
                                <TableCell>Mô Tả</TableCell>
                                <TableCell>Quản lí</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expertQuestionCategoryCurrent?.map((category) => (
                                <TableRow key={category.id} >
                                    <TableCell sx={{
                                        opacity: categoryStatus[category.id] ? 1 : 0.5,
                                        pointerEvents: categoryStatus[category.id] ? 'auto' : 'none'
                                    }}>
                                        {category.category}
                                    </TableCell>
                                    <TableCell sx={{
                                        opacity: categoryStatus[category.id] ? 1 : 0.5,
                                        pointerEvents: categoryStatus[category.id] ? 'auto' : 'none'
                                    }}>
                                        {category.description}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Sửa">
                                            <IconButton onClick={() => handleEdit(category)}>
                                                <EditIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={categoryStatus[category.id] ? "Ẩn" : "Hiện"}>
                                            <Switch
                                                checked={categoryStatus[category.id] || false}
                                                onChange={() => handleStatusChange(category)}
                                                color="primary"
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SubCard>

            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Thêm danh mục</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Danh mục"
                        fullWidth
                        value={newCategory.category}
                        onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Mô tả"
                        fullWidth
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleAddCategory} color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function InterviewQuestionTable({ refresh, refreshTime, token }: { refresh: () => void, refreshTime: number, token: string }) {

    const { expertQuestionCategory } = UseGetExpertQuestionCategory(refreshTime);

    const { bookingExpertFeedbackQuestion } = UseGetBookingExpertFeedbackQuestion(refreshTime);

    const [selectedQuestion, setSelectedQuestion] = useState<BookingExpertFeedbackQuestion | undefined>(undefined);

    const [openAddDialog, setOpenAddDialog] = useState(false);
    
    const [newQuestion, setNewQuestion] = useState({ question: '', type: '', categoryId: 0 });

    const handleAdd = async () => {
        console.log(newQuestion);
        try {
            if (newQuestion.question === "" || newQuestion.type === "" || newQuestion.categoryId === 0) {
                return;
            }
            const res = await PostBookingExpertFeedbackQuestion({ question: newQuestion.question, type: newQuestion.type, categoryId: newQuestion.categoryId }, token);
            if (res.status !== "success") {
                return;
            }
            console.log(res);
            refresh();
            setOpenAddDialog(false);
            setNewQuestion({ question: '', type: '', categoryId: 0 });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelect = (data: BookingExpertFeedbackQuestion) => {
        setSelectedQuestion(data);
    };

    const handleConfirmDelete = async () => {
        if (selectedQuestion) {
            console.log('Delete question:', selectedQuestion);
            try {
                const res = await DelBookingExpertFeedbackQuestionById({ id: selectedQuestion.id });
                if (res.status !== "success") {
                    return;
                }
                console.log(res);
                refresh();
                setSelectedQuestion(undefined);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <SubCard
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" color="primary">Quản lí câu hỏi phỏng vấn</Typography>
                        <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
                            Thêm câu hỏi
                        </Button>
                    </Box>
                }
                sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Câu hỏi</TableCell>
                                <TableCell>Kiểu câu hỏi</TableCell>
                                <TableCell>Thuộc danh mục</TableCell>
                                <TableCell>Quản lí</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingExpertFeedbackQuestion?.map((question, index) => (
                                <TableRow key={index}>
                                    <TableCell>{question.question}</TableCell>
                                    <TableCell>{expertTypeInputList.find((value) => value.name === question.type)?.description}</TableCell>
                                    <TableCell>{question.category}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Sửa">
                                            <IconButton onClick={() => handleSelect(question)}>
                                                <EditIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa">
                                            <IconButton onClick={() => handleSelect(question)}>
                                                <DeleteIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SubCard>

            <Dialog open={Boolean(selectedQuestion)} onClose={() => setSelectedQuestion(undefined)}>
                <DialogTitle>Xác nhận xóa câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa câu hỏi <Typography component="span" color="primary">{selectedQuestion?.question}</Typography> ở danh mục <Typography component="span" color="primary">{selectedQuestion?.category}</Typography> ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedQuestion(undefined)} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
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
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Chọn kiểu phỏng vấn</InputLabel>
                        <Select
                            label="Chọn kiểu câu hỏi"
                            value={newQuestion.type}
                            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value as string })}
                            sx={{ mb: 2 }}
                        >
                            {expertTypeInputList.map((data, index) => (
                                <MenuItem value={data.name} key={index}>{data.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Chọn danh mục</InputLabel>
                        <Select
                            label="Chọn danh mục"
                            value={newQuestion.categoryId}
                            onChange={(e) => setNewQuestion({ ...newQuestion, categoryId: e.target.value as number })}
                        >
                            {expertQuestionCategory?.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function InterViewQuestionManagePage() {

    const { expertToken } = ExpertToken();

    const { refresh, refreshTime } = useRefresh();

    // useEffect(() => { console.log("expertToken", expertToken) }, [expertToken]);

    return (
        <Box>
            <CategoryTable refresh={refresh} refreshTime={refreshTime} token={expertToken} />
            <InterviewQuestionTable refresh={refresh} refreshTime={refreshTime} token={expertToken} />
        </Box>
    );
}

export default InterViewQuestionManagePage;
