import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { BookingCustomerFeedbackQuestion } from "package/api/booking-customer-feedback-question";
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const feedbackTypes = [
    { value: "text", label: "Dạng văn bản" },
    { value: "number", label: "Dạng số" },
    { value: "rating", label: "Đánh giá" },
    { value: "experience", label: "Trải nghiệm" },
];

export const InterviewQuestionTableRender = ({
    bookingCustomerFeedbackQuestion,
    handleDelete,
    handleEdit,
    setOpenAddDialog
}: {
    bookingCustomerFeedbackQuestion: BookingCustomerFeedbackQuestion[],
    handleDelete: (id: number) => void,
    handleEdit: (id: number) => void,
    setOpenAddDialog: (open: boolean) => void
}) => {
    const columns: GridColDef[] = [
        {
            field: 'question', headerName: 'Câu hỏi', flex: 2, renderCell: (params) => (
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'type',
            headerName: 'Kiểu câu hỏi',
            flex: 1,
            renderCell: (params) => {
                const typeLabel = feedbackTypes.find(type => type.value === params.value)?.label || "Không xác định";
                return <>{typeLabel}</>;
            }
        },
        {
            field: 'actions',
            headerName: 'Quản lý',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Tooltip title="Sửa">
                        <IconButton onClick={() => handleEdit(params.row.id)}>
                            <EditIcon  />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookingCustomerFeedbackQuestion];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) => {
                const typeLabel = feedbackTypes.find(type => type.value === row.type)?.label.toLowerCase() || '';
                return (
                    row.question.toLowerCase().includes(lowerCaseText) ||
                    typeLabel.includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, bookingCustomerFeedbackQuestion]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} />
                </FlexBox>
            </Grid>
            <Grid item xs={12} lg={8}>
                <FlexBox justifyContent={'right'}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Thêm câu hỏi
                    </Button>
                </FlexBox>
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((data) => ({
            ...data,
            object: JSON.stringify(data),
        })),
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};
