import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Typography, Grid, Input, DialogContentText } from '@mui/material';
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
import { FlexBox } from 'components/common/box/flex-box';
import { useGetFilter } from 'components/common/filter-table/hook-filter';

export const InterviewQuestionTable = ({ refresh, refreshTime, token }: { refresh: () => void; refreshTime: number; token: string; }) => {
    const { bookingExpertFeedbackQuestion } = UseGetBookingExpertFeedbackQuestionCurrent(token, refreshTime);
    const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(token, refreshTime);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [questionData, setQuestionData] = useState<{ question: string, type: string, categoryId: number }>({ question: '', type: '', categoryId: 0 });

    // Hàm xử lý lưu câu hỏi (thêm hoặc chỉnh sửa)
    const handleSaveQuestion = async () => {
        try {
            if (questionData.question === "" || questionData.type === "" || questionData.categoryId === 0) return;

            if (editMode && selectedQuestion) {
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

    const handleDeleteQuestion = async () => {
        try {
            if (selectedQuestion) {
                const res = await DelBookingExpertFeedbackQuestionById({ id: selectedQuestion.id });
                if (res.status === "success") {
                    enqueueSnackbar('Xóa câu hỏi thành công', { variant: 'success' });
                    refresh();
                } else {
                    enqueueSnackbar('Xóa câu hỏi thất bại', { variant: 'error' });
                }
            }
            setOpenDeleteDialog(false);
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
                        <IconButton onClick={() => { setSelectedQuestion(params.row); setOpenDeleteDialog(true); }}>
                            <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    ];

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookingExpertFeedbackQuestion];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) => {
                return (
                    row.question.toLowerCase().includes(lowerCaseText) ||
                    row.type.toLowerCase().includes(lowerCaseText) ||
                    expertQuestionCategoryCurrent.find(category => category.id === row.categoryId)?.category.toLowerCase().includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, bookingExpertFeedbackQuestion, expertQuestionCategoryCurrent]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} />
                </FlexBox>
            </Grid>
            <Grid item xs={12} lg={8}>
                <FlexBox justifyContent={'right'} />
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData,
    };

    return (
        <>
            <MainCard
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Quản lí câu hỏi phỏng vấn</Typography>
                        <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Thêm câu hỏi</Button>
                    </Box>
                }
            >
                {RenderClientFilter}
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Xác nhận xóa câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa câu hỏi{" "}
                        <Typography component="span" color="primary">
                            {selectedQuestion?.question}
                        </Typography>{" "}
                        trong danh mục{" "}
                        <Typography component="span" color="primary">
                            {selectedQuestion?.category}
                        </Typography>{" "}
                        không?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleDeleteQuestion} color="primary" autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
