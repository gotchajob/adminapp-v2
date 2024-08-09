import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { ReactNode, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

export interface Certificate {
  certificateLink: string;
}

export const ManageCertificate = ({
  certificateList,
  setCertificateList,
}: {
  certificateList: Certificate[];
  setCertificateList: (data: Certificate[]) => void;
}) => {
  const handleDeleteCertificate = (index: number) => {
    let newCertificateList = [...certificateList];
    newCertificateList.splice(index, 1);

    setCertificateList(newCertificateList);
  };

  const handleAddNewCertificate = () => {
    const newCertificateList = [...certificateList, { certificateLink: "" }];
    setCertificateList(newCertificateList);
  };

  const handleChangeCertificate = (certificate: Certificate, index: number) => {
    const newCertificateList = [...certificateList];
    newCertificateList[index] = certificate;
    setCertificateList(newCertificateList);
  };

  const Wrapper = ({
    deleteIndex,
    children,
  }: {
    deleteIndex: number;
    children: ReactNode;
  }) => (
    <Grid container>
      <Grid item xs={11.5}>
        {children}
      </Grid>
      <Grid item xs={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <IconButton
          size="small"
          onClick={() => {
            handleDeleteCertificate(deleteIndex);
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </Grid>
  );

  const renderCertificate = (certificate: Certificate, index: number) => (
    <Wrapper key={index} deleteIndex={index}>
      <Stack spacing={1}>
        <TextField
          fullWidth
          value={certificate.certificateLink}
          onChange={(e) => {
            handleChangeCertificate(
              {
                ...certificate,
                certificateLink: e.target.value,
              },
              index
            );
          }}
        />
      </Stack>
    </Wrapper>
  );

  return (
    <Stack spacing={3}>
      {certificateList.map((item, index) => renderCertificate(item, index))}
      <Button
        onClick={handleAddNewCertificate}
        variant="outlined"
        sx={{ width: 200 }}
      >
        Thêm mới chứng chỉ
      </Button>
    </Stack>
  );
};
