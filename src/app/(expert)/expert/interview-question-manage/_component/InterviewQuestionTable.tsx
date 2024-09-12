import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid/models';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { expertTypeInputList } from 'components/common/feedback/interface';
import { UseGetExpertQuestionCategoryCurrent } from 'hooks/use-get-expert-question-category';
import { DelBookingExpertFeedbackQuestionById, PatchBookingExpertFeedbackQuestionById } from 'package/api/booking-expert-feedback-question/id';
import { UseGetBookingExpertFeedbackQuestionCurrent } from 'hooks/use-get-booking-expert-feedback-question';
import { PostBookingExpertFeedbackQuestion } from 'package/api/booking-expert-feedback-question';
import { enqueueSnackbar } from 'notistack';

export const InterviewQuestionTable = ({ refresh, refreshTime, token }: { refresh: () => void; refreshTime: number; token: string; }) => {
    const { bookingExpertFeedbackQuestion } = UseGetBookingExpertFeedbackQuestionCurrent(token, refreshTime);
    const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(token, refreshTime);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [questionData, setQuestionData] = useState<{ question: string, type: string, categoryId: number }>({ question: '', type: '', categoryId: 0 });

    // Hàm xử lý lưu câu hỏi (thêm hoặc chỉnh sửa)
    const handleSaveQuestion = async () => {
        try {
            if (questionData.question === "" || questionData.type === "" || questionData.categoryId === 0) return;

            if (editMode && selectedQuestion) {
                // Nếu đang chỉnh sửa, gọi API Patch
                const res = await PatchBookingExpertFeedbackQuestionById({
                    id: selectedQuestion.id,
                    question: questionData.question,
                    type: questionData.type,
                    categoryId: questionData.categoryId,
                }, token);
                if (res.status === "success") {
                    enqueueSnackbar('Cập nhật câu hỏi thành công', { variant: 'success' });
                    refresh();
                } else {
                    enqueueSnackbar('Cập nhật câu hỏi thất bại', { variant: 'error' });
                }
            } else {
                // Nếu đang thêm mới, gọi API Post
                const res = await PostBookingExpertFeedbackQuestion(questionData, token);
                if (res.status === "success") {
                    enqueueSnackbar('Thêm câu hỏi thành công', { variant: 'success' });
                    refresh();
                } else {
                    enqueueSnackbar('Thêm câu hỏi thất bại', { variant: 'error' });
                }
            }
            resetDialog();
        } catch (error) {
            enqueueSnackbar('Lỗi trong quá trình xử lý', { variant: 'error' });
        }
    };

    const handleDeleteQuestion = async (id: number) => {
        try {
            const res = await DelBookingExpertFeedbackQuestionById({ id });
            if (res.status === "success") {
                enqueueSnackbar('Xóa câu hỏi thành công', { variant: 'success' });
                refresh();
            } else {
                enqueueSnackbar('Xóa câu hỏi thất bại', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Lỗi trong quá trình xóa câu hỏi', { variant: 'error' });
        }
    };

    const handleEditQuestion = (question: any) => {
        setEditMode(true);
        setSelectedQuestion(question);
        setQuestionData({
            question: question.question,
            type: question.type,
            categoryId: question.categoryId,
        });
        setOpenDialog(true);
    };

    const resetDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setSelectedQuestion(null);
        setQuestionData({ question: '', type: '', categoryId: 0 });
    };

    const columns: GridColDef[] = [
        { field: 'question', headerName: 'Câu hỏi', flex: 1 },
        { field: 'type', headerName: 'Kiểu câu hỏi', flex: 1 },
        { field: 'category', headerName: 'Danh mục', flex: 1 },
        {
            field: 'actions',
            headerName: 'Quản lí',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Tooltip title="Sửa">
                        <IconButton onClick={() => handleEditQuestion(params.row)}>
                            <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton onClick={() => handleDeleteQuestion(params.row.id)}>
                            <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    ];

    const filteredData = useMemo(() => {
        return bookingExpertFeedbackQuestion.map((question: any) => ({
            ...question,
            actions: JSON.stringify(question),
        }));
    }, [bookingExpertFeedbackQuestion]);

    const props: DataGridTableProps = {
        columns,
        rows: filteredData,
    };

    return (
        <>
            <MainCard
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>Quản lí câu hỏi phỏng vấn</Typography>
                        <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Thêm câu hỏi</Button>
                    </Box>
                }
            >
                <DataGridTable props={props} />
            </MainCard>

            {/* Add/Edit Question Dialog */}
            <Dialog open={openDialog} onClose={resetDialog}>
                <DialogTitle>{editMode ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Câu hỏi"
                        fullWidth
                        value={questionData.question}
                        onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                    />
                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Chọn kiểu câu hỏi"
                        value={questionData.type}
                        onChange={(e) => setQuestionData({ ...questionData, type: e.target.value as string })}
                    >
                        {expertTypeInputList.map((type, index) => (
                            <MenuItem key={index} value={type.name}>
                                {type.description}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Chọn danh mục"
                        value={questionData.categoryId}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                categoryId: Number(e.target.value),
                            })
                        }
                    >
                        {expertQuestionCategoryCurrent?.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.category}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={resetDialog} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleSaveQuestion} color="primary">
                        {editMode ? "Cập nhật" : "Thêm"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
