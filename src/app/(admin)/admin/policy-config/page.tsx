"use client"

import { Box, Button, CircularProgress, Stack } from "@mui/material"
import ReactQuillDemo from "components/forms/plugins/Wysiwug/ReactQuill";
import { useGetPolicy } from "hooks/use-get-policy";
import { AdminToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { enqueueSnackbar } from "notistack";
import { Policy } from "package/api/policy";
import { PatchPolicyById } from "package/api/policy/[id]";
import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";

export default function PolicyConfig() {
    const { refresh, refreshTime } = useRefresh();
    const { adminToken } = AdminToken();
    const { policy, loading } = useGetPolicy(adminToken ? adminToken : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjY4MzYyNTUsImV4cCI6MTcyNjg3OTQ1NX0.VMl5WBFlXprxTyyXcTJDhYL8eV9_dLJ7-TXJhN7WMZc', refreshTime);
    const [policyContent, setPolicyContent] = useState<{ [key: number]: string }>({});
    const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

    // Cập nhật nội dung cho một policy cụ thể
    const handleContentChange = (policyId: number, content: string) => {
        setPolicyContent((prevState) => ({
            ...prevState,
            [policyId]: content,
        }));
    };

    // Reset lại nội dung của một policy về giá trị gốc
    const handleResetContent = (policyId: number, originalDescription: string) => {
        setPolicyContent((prevState) => ({
            ...prevState,
            [policyId]: originalDescription,
        }));
    };

    // Gọi hàm PatchPolicyById để lưu nội dung
    const handlePatchPolicy = async (policyId: number, value: string) => {
        setIsLoading((prevState) => ({ ...prevState, [policyId]: true }));
        try {
            const res = await PatchPolicyById(
                {
                    id: policyId,
                    value,
                    description: policyContent[policyId],
                },
                adminToken
            );
            if (res.status === "success") {
                enqueueSnackbar('Cập nhật chính sách thành công!', { variant: 'success' });
                refresh();
            } else {
                enqueueSnackbar(`Có lỗi xảy ra: ${res.responseText}`, { variant: 'error' });
            }
        } catch (error: any) {
            enqueueSnackbar('Cập nhật thất bại: ' + error.message, { variant: 'error' });
        } finally {
            setIsLoading((prevState) => ({ ...prevState, [policyId]: false }));
        }
    };

    return (
        <>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress size={80} />
                </Box>
            ) : (
                policy.map((policy: Policy) => (
                    <MainCard key={policy.id} title={policy.key} sx={{ my: 3 }}>
                        <ReactQuillDemo
                            data={policy.description}
                            setData={(content: string) => handleContentChange(policy.id, content)}
                        />
                        <Stack direction="row" justifyContent={"flex-end"} spacing={2} sx={{ pt: 2 }}>
                            {/* <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleResetContent(policy.id, policy.description)}
                            >
                                Bỏ thay đổi
                            </Button> */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handlePatchPolicy(policy.id, policy.value)}
                                disabled={isLoading[policy.id]}
                            >
                                {isLoading[policy.id] ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </Stack>
                    </MainCard>
                ))
            )}
        </>
    )
}