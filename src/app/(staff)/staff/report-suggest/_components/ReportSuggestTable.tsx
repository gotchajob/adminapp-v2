import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReportSuggest } from 'package/api/report-suggest';

export const ReportSuggestTableRender = ({
    reportSuggest,
    handleDelete,
    handleEdit,
}: {
    reportSuggest: ReportSuggest[],
    handleDelete: (id: number) => void,
    handleEdit: (id: number) => void,
}) => {
    const columns: GridColDef[] = [
        {
            field: 'report', headerName: 'Đề xuất Báo cáo', flex: 2, renderCell: (params) => (
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'description', headerName: 'Mô tả', flex: 2, renderCell: (params) => (
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Quản lý',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Tooltip title="Sửa">
                        <IconButton onClick={() => handleEdit(params.row.id)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...reportSuggest];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) =>
                row.report.toLowerCase().includes(lowerCaseText) ||
                row.description.toLowerCase().includes(lowerCaseText)
            );
        }
        return data;
    }, [text, reportSuggest]);

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
                    {/* Có thể thêm các nút chức năng khác vào đây */}
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
