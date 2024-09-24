"use client";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { FlexBox } from "components/common/box/flex-box";
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
  const { policy, loading } = useGetPolicy(adminToken, refreshTime);
  const [policyContent, setPolicyContent] = useState<{ [key: number]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Cập nhật nội dung cho một policy cụ thể
  const handleContentChange = (policyId: number, value: string) => {
    setPolicyContent((prevState) => ({
      ...prevState,
      [policyId]: value,
    }));
  };

  // Gọi hàm PatchPolicyById để lưu nội dung
  const handlePatchPolicy = async () => {
    setIsLoading(true);
    try {
      // Use map to create an array of promises
      const promises = Object.entries(policyContent).map(async ([key, value]) => {
        const res = await PatchPolicyById(
          {
            id: +key,
            value,
            description: policy.find((data) => data.id === +key)?.description || "",
          },
          adminToken
        );
        if (res.status === "error") {
          throw new Error(res.responseText);
        }
        return res; 
      });
  
      await Promise.all(promises);
      
      enqueueSnackbar("Cập nhật thành công!", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar("Cập nhật thất bại: " + error.message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false); // set to false instead of true
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
        <MainCard>
          <Grid container spacing={3}>
            {policy.map((policy: Policy) => (
              <Grid item xs={6} key={policy.id}>
                <Grid container spacing={1} alignItems={"flex-end"}>
                  <Grid item xs={6}>
                    <Button size="small">{policy.description}:</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={policyContent[policy.id] || policy.value}
                      onChange={(e) => {
                        handleContentChange(policy.id, e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <FlexBox justifyContent={"flex-end"}>
                <LoadingButton
                  variant="outlined"
                  onClick={handlePatchPolicy}
                  loading={isLoading}
                >
                  Lưu thay đổi
                </LoadingButton>
              </FlexBox>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
}
