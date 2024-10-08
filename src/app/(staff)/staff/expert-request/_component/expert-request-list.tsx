"use client";

import { useEffect, useState } from "react";

//next

// material-ui
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// assets

import { ExpertRegister } from "package/api/expert-register-request";
import Avatar from "ui-component/extended/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useRefresh } from "hooks/use-refresh";
import { enqueueSnackbar } from "notistack";
import { LoadingButton, Skeleton } from "@mui/lab";
import { formatDate } from "package/util";
import TextField from "@mui/material/TextField";
import { useGetExpertRegisterRequest } from "hooks/use-get-expert-register-request";
import Chip from "ui-component/extended/Chip";
import { ExpertRegisterApprove } from "package/api/expert-register-request/id/approve";
import { StaffToken } from "hooks/use-login";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import DoneAllTwoToneIcon from "@mui/icons-material/DoneAllTwoTone";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { ExpertRegisterRejectForm } from "package/api/expert-register-request/id/reject-form";
import { PatchExpertRegisterBan } from "package/api/expert-register-request/id/ban";
import { ExpertRegisterApproveForm } from "package/api/expert-register-request/id/approve-form";
import { useRouter } from "next/navigation";
import CircularLoader from "ui-component/CircularLoader";
import { RendeExpertRequestTable } from "./ExpertRequestTable";

const avatarImage = "/assets/images/experts";

const StatusChip = ({ status }: { status: number }) => {
  const props = { label: "", variant: "" };
  switch (status) {
    case 0:
      props.label = "Đã khóa";
      props.variant = "error";
      break;
    case 1:
      props.label = "Chờ xử lí";
      props.variant = "warning";
      break;
    case 2:
      props.label = "Đã gửi form đăng kí";
      props.variant = "success";
      break;
    case 3:
      props.label = "Chờ duyệt form";
      props.variant = "success";
      break;
    case 4:
      props.label = "Chờ cập nhật";
      props.variant = "warning";
      break;
    case 5:
      props.label = "Hoàn tất";
      props.variant = "success";
      break;
  }
  return <Chip label={props.label} chipcolor={props.variant as any} />;
};
// ==============================|| USER LIST 1 ||============================== //

const ExpertRequestList = () => {
  const { refreshTime, refresh } = useRefresh();

  //State loading button dialog
  const [isLoading, setIsLoading] = useState(false);

  const { expertRegisterRequest, loading } = useGetExpertRegisterRequest(
    { limit: 1000, page: 1, search: ["id>32"] },
    refreshTime
  );

  //expert selection state
  const [expertSendForm, setExpertSendForm] = useState<ExpertRegister | null>(
    null
  );

  const [expertBan, setExpertBan] = useState<ExpertRegister | null>(null);

  const { staffToken } = StaffToken();

  const [rejectReason, setRejectReason] = useState<string>("");

  const [expertApprove, setExpertApprove] = useState<ExpertRegister | null>();

  const [expertReject, setExpertReject] = useState<ExpertRegister | null>();

  const router = useRouter();

  //Approve expert handle
  const openExpertApprove = (expert: ExpertRegister) => {
    setExpertApprove(expert);
  };

  //Reject expert handle
  const openExpertReject = (expert: ExpertRegister) => {
    setExpertReject(expert);
  };

  //Approve expert handle
  const openExpertSendForm = (value: any) => {
    setExpertSendForm(value);
  };

  //Reject expert handle
  const openExpertBan = (value: ExpertRegister) => {
    setExpertBan(value);
  };

  //Approve
  const approveHandle = async () => {
    try {
      setIsLoading(true);
      if (!expertApprove) {
        throw new Error("Hãy chọn đơn muốn xác nhận hoàn thành");
      }
      const action = await ExpertRegisterApproveForm(
        { id: expertApprove.id },
        staffToken
      );
      if (action.status === "error") {
        throw new Error("");
      }
      enqueueSnackbar(`Đăng kí thành công`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Đăng kí thất bại`, {
        variant: "error",
      });
    } finally {
      refresh();
      setIsLoading(false);
      setExpertApprove(null);
    }
  };

  //Reject handle
  const rejectHandle = async () => {
    try {
      setIsLoading(true);
      const currentHost = window.location.hostname;
      if (!expertReject) {
        throw new Error("Hãy chọn đơn muốn xác nhận từ chối");
      }
      // const action = await ExpertRegisterRejectForm({
      //   id: expertReject.id,
      //   reasonReject: rejectReason,
      //   url: `${currentHost}:3000/form/update/${expertReject.email}-${expertReject.id}`,
      // });
      // if (action.status === "error") {
      //   throw new Error("");
      // }
      enqueueSnackbar(`Từ chối đơn đăng kí thành công`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Từ chối đơn đăng kí thất bại`, {
        variant: "error",
      });
    } finally {
      refresh();
      setIsLoading(false);
      setExpertReject(null);
    }
  };

  const sendFormHandle = async () => {
    try {
      setIsLoading(true);
      const currentHost = window.location.hostname;
      if (!expertSendForm) {
        throw new Error("Chọn đơn muốn gửi ");
      }
      const data = await ExpertRegisterApprove(
        {
          id: expertSendForm.id,
          url: `${currentHost}/form/create/${expertSendForm.email}-${expertSendForm.id}`,
        },
        staffToken
      );
      if (data.status === "error") {
        throw new Error("");
      }
      refresh();
      enqueueSnackbar("Gửi thành công !", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Gửi thất bại !", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
      setExpertSendForm(null);
    }
  };

  const banHandle = async () => {
    try {
      setIsLoading(true);
      if (!expertBan) {
        throw new Error("Chọn đơn muốn chặn");
      }
      const data = await PatchExpertRegisterBan({ id: expertBan.id });
      if (data.status === "error") {
        throw new Error("");
      }
      enqueueSnackbar("Gửi thành công !", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Gửi thất bại !", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
      setExpertBan(null);
      refresh();
    }
  };

  const ActionButton = ({ row }: { row: ExpertRegister }) => {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        {!(
          row.status === 5 ||
          row.status === 0 ||
          row.status === 1 ||
          row.status === 2 ||
          row.status === 4
        ) ? (
          <Tooltip placement="top" title="Duyệt">
            <IconButton
              color="success"
              aria-label="approve"
              size="large"
              onClick={() => {
                openExpertApprove(row);
              }}
            >
              <DoneAllTwoToneIcon sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </Tooltip>
        ) : null}
        {!(
          row.status === 5 ||
          row.status === 0 ||
          row.status === 2 ||
          row.status === 3 ||
          row.status === 4
        ) ? (
          <Tooltip placement="top" title="Gửi form đăng kí">
            <IconButton
              color="primary"
              aria-label="approve"
              size="large"
              onClick={() => {
                openExpertSendForm(row);
              }}
            >
              <EmailTwoToneIcon sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </Tooltip>
        ) : null}
        {/* {!(
          row.status === 5 ||
          row.status === 0 ||
          row.status === 1 ||
          row.status === 2 ||
          row.status === 4
        ) ? (
          <Tooltip placement="top" title="Từ chối">
            <IconButton
              color="warning"
              size="large"
              onClick={() => {
                openExpertReject(row);
              }}
            >
              <ErrorTwoToneIcon sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </Tooltip>
        ) : null} */}

        <Tooltip placement="top" title="Chặn">
          <IconButton
            color="error"
            size="large"
            onClick={() => {
              openExpertBan(row);
            }}
          >
            <BlockTwoToneIcon sx={{ fontSize: "1.1rem" }} />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };

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
      {expertRegisterRequest.length > 0 ? (
        <RendeExpertRequestTable
          expertRegisterRequest={expertRegisterRequest}
          handleApprove={openExpertApprove}
          handleReject={openExpertReject}
          handleSendForm={openExpertSendForm}
          handleBan={openExpertBan}
        />)
        :
        (SkeletonTable())
      }

      {/* Approve dialog */}
      <Dialog open={Boolean(expertApprove)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">
          Xác nhận đơn đăng kí ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn muốn xác nhận đơn đăng kí :{" "}
            {expertApprove ? expertApprove.email : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            type="button"
            onClick={() => setExpertApprove(null)}
          >
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={approveHandle}>
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={Boolean(expertReject)} maxWidth="sm" fullWidth>
        <DialogTitle id="alert-dialog-title">
          Xác nhận từ chối đơn đăng kí ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn muốn từ chối đơn đăng kí:{" "}
            <span style={{ fontWeight: "bold" }}>
              {expertReject ? expertReject.email : ""}
            </span>
          </Typography>
          <TextField
            size="medium"
            value={rejectReason}
            variant="filled"
            label="Nội dung từ chối"
            fullWidth
            minRows={4}
            multiline
            sx={{ mt: 2 }}
            onChange={(e) => {
              setRejectReason(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            type="button"
            onClick={() => setExpertReject(null)}
          >
            Đóng
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={rejectHandle}
            disabled={rejectReason.length <= 0}
          >
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Approve */}
      <Dialog maxWidth="xs" fullWidth open={Boolean(expertSendForm)}>
        <DialogTitle>Xác nhận gửi form đăng kí?</DialogTitle>
        <DialogContent>
          Bạn muốn gửi form đăng kí tới email:{" "}
          <span style={{ fontWeight: "600", marginLeft: 10 }}>
            {expertSendForm?.email}
          </span>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setExpertSendForm(null)}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={sendFormHandle}>
            Gửi
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Reject */}
      <Dialog maxWidth="xs" fullWidth open={Boolean(expertBan)}>
        <DialogTitle>Xác nhận chặn email ?</DialogTitle>
        <DialogContent>
          Bạn muốn chặn email:{" "}
          <span style={{ fontWeight: "600", marginLeft: 10 }}>
            {expertBan?.email}
          </span>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setExpertBan(null)}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={banHandle}>
            Chặn
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpertRequestList;

{/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Email đăng kí</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
              <TableCell align="center">Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {expertRegisterRequest.length > 0
              ? expertRegisterRequest.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {row.email}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {formatDate(row.createdAt, "dd-MM-yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {formatDate(row.createdAt, "dd-MM-yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={row.status} />
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <ActionButton row={row} />
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <IconButton
                      color="default"
                      size="large"
                      disabled={row.status === 1 || row.status === 2}
                      onClick={() => {
                        router.push(
                          `/staff/expert-request/expert-detail/${row.id}-${row.expertId}`
                        );
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: "1.1rem" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              : null}
            {expertRegisterRequest.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                    Hiện chưa có đơn đăng ký tài khoản nào
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <CircularLoader />
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer> */}
