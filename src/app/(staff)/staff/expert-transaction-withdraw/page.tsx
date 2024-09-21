"use client";

import BeenhereIcon from '@mui/icons-material/Beenhere';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import { useGetTransaction } from 'hooks/use-get-transaction';
import { useGetTransactionType } from 'hooks/use-get-transaction-type';
import { StaffToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { enqueueSnackbar } from 'notistack';
import { PatchCompleteWithdrawn } from 'package/api/account/withdrawn/transactionId/complete';
import { PatchRejectWithdrawn } from 'package/api/account/withdrawn/transactionId/reject';
import { formatDate } from 'package/util';
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { RenderExpertTransactionWithDrawTable } from './_component/ExpertTransactionWithDrawTable';

const formatCurrency = (value: number) => {
    try {
        if (isNaN(value) || value === null || value === undefined) {
            return '0 đ';
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    } catch (error) {
        console.error('Lỗi khi format currency:', error);
        return '0 đ';
    }
};

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Thành công" color="success" />;
        case 2:
            return <Chip label="Đang xử lý" color="warning" />;
        case 3:
            return <Chip label="Thất bại" color="error" />;
        default:
            return <Chip label="Unknown" />;
    }
};

export default function ExpertTransactionWithDraw() {
    const { staffToken } = StaffToken();
    const { refresh, refreshTime } = useRefresh();
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPage, setTotalPage] = useState(1);

    const { transaction, loading: transactionLoading } = useGetTransaction({ pageNumber: page, pageSize: rowsPerPage }, staffToken, refreshTime);
    const { transactionType, loading: transactionTypeLoading } = useGetTransactionType(refreshTime);

    // Lấy description của transaction type dựa trên typeId
    const getTransactionTypeName = (typeId: number) => {
        const type = transactionType?.find((type) => type.id === typeId);
        return type ? type.description : "Không xác định";
    };

    const [dialogState, setDialogState] = useState({
        isApproveDialogOpen: false,
        isRejectDialogOpen: false,
        currentTransactionId: null as number | null,
        rejectReason: ''
    });

    const handleApprove = (transactionId: number) => {
        openDialog('approve', transactionId);
    };

    const handleReject = (transactionId: number) => {
        openDialog('reject', transactionId);
    };

    const openDialog = (type: 'approve' | 'reject', id: number) => {
        setDialogState({
            ...dialogState,
            isApproveDialogOpen: type === 'approve',
            isRejectDialogOpen: type === 'reject',
            currentTransactionId: id,
        });
    };

    const closeDialog = () => {
        setDialogState({
            isApproveDialogOpen: false,
            isRejectDialogOpen: false,
            currentTransactionId: null,
            rejectReason: ''
        });
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleAction = async (actionType: 'approve' | 'reject') => {
        const { currentTransactionId, rejectReason } = dialogState;
        if (currentTransactionId === null || (actionType === 'reject' && rejectReason.trim() === '')) return;

        try {
            const response = actionType === 'approve'
                ? await PatchCompleteWithdrawn({ transactionId: currentTransactionId }, staffToken)
                : await PatchRejectWithdrawn({ transactionId: currentTransactionId, reason: rejectReason }, staffToken);

            if (response.status === 'success') {
                enqueueSnackbar(`Giao dịch đã được ${actionType === 'approve' ? 'duyệt' : 'từ chối'} thành công!`, { variant: 'success' });
            } else {
                enqueueSnackbar(`Có lỗi xảy ra khi ${actionType === 'approve' ? 'duyệt' : 'từ chối'} giao dịch!`, { variant: 'error' });
            }
        } catch (error) {
            console.error(`Error ${actionType} transaction:`, error);
            enqueueSnackbar(`Lỗi hệ thống khi ${actionType === 'approve' ? 'duyệt' : 'từ chối'} giao dịch!`, { variant: 'error' });
        } finally {
            closeDialog();
            refresh();
        }
    };

    useEffect(() => {
        if (transaction && transaction.totalPage) {
            setTotalPage(transaction.totalPage);
        }
    }, [transaction]);

    return (
        <MainCard title="Danh sách yêu cầu rút tiền của chuyên gia">
            {transaction && transactionType && (
                <RenderExpertTransactionWithDrawTable
                    transaction={transaction.list}
                    transactionType={transactionType}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                />
            )}


            {/* Dialog Duyệt giao dịch */}
            <Dialog open={dialogState.isApproveDialogOpen} onClose={closeDialog}>
                <DialogTitle>Xác nhận duyệt giao dịch</DialogTitle>
                <DialogContent>Bạn có chắc chắn muốn duyệt giao dịch với ID: {dialogState.currentTransactionId}?</DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Hủy</Button>
                    <Button onClick={() => handleAction('approve')} color="primary">Duyệt</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Từ chối giao dịch */}
            <Dialog open={dialogState.isRejectDialogOpen} onClose={closeDialog}>
                <DialogTitle>Xác nhận từ chối giao dịch với ID: {dialogState.currentTransactionId}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Lý do từ chối"
                        type="text"
                        fullWidth
                        value={dialogState.rejectReason}
                        onChange={(e) => setDialogState({ ...dialogState, rejectReason: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Hủy</Button>
                    <Button onClick={() => handleAction('reject')} color="primary" disabled={dialogState.rejectReason.trim() === ''}>
                        Từ chối
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

{/* <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Giao Dịch</TableCell>
                            <TableCell>Số Tiền Giao Dịch</TableCell>
                            <TableCell>Loại Giao Dịch</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Ngày Thực Hiện Giao Dịch</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionLoading || transactionTypeLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : transaction.list.length > 0 ? (
                            transaction.list.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00796b' }}>
                                        {formatCurrency(data.amount)}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                                        {getTransactionTypeName(data.typeId)}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                        {data.description}
                                    </TableCell>
                                    <TableCell>{renderStatusChip(data.status)}</TableCell>
                                    <TableCell>{formatDate(data.createdAt, "dd/MM/yyyy hh:mm")}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Duyệt yêu cầu">
                                            <IconButton onClick={() => openDialog('approve', data.id)} sx={{ color: "#2196F3" }}>
                                                <BeenhereIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Từ chối yêu cầu">
                                            <IconButton onClick={() => openDialog('reject', data.id)} sx={{ color: "#F44336" }}>
                                                <CancelPresentationIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow hover>
                                <TableCell colSpan={7} align="center">
                                    Hiện chưa có giao dịch nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Box sx={{ display: "flex", justifyContent: "center", paddingY: 3 }}>
                    <Pagination
                        count={totalPage}
                        page={page}
                        onChange={handleChangePage}
                        shape="rounded"
                        variant="outlined"
                        color="primary"
                    />
                </Box>
            </TableContainer> */}