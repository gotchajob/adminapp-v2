"use client";

import ImageIcon from "@mui/icons-material/Image";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import RedoIcon from "@mui/icons-material/Redo";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SaveIcon from "@mui/icons-material/Save";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import UndoIcon from "@mui/icons-material/Undo";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FlexBetween, FlexBox } from "components/common/box/flex-box";
import { StyledLink } from "components/common/link/styled-link";
import { CVTemplate } from "components/cv-component/interface";
import IconButton from "@mui/material/IconButton";
import { PRIMARYCOLOR } from "components/common/config";
import SubCard from "ui-component/cards/SubCard";
import { Text } from "components/common/text/text";

const ManageCVHeader = ({
  cv,
  onChangeCV,
  download,
  review,
  save,
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
  download: () => void;
  review: () => void;
  save: () => void;
}) => {
  const handleSaveAndDowload = () => {
    download();
  };

  const handleReview = () => {
    review();
  };

  const handleSave = () => {
    save();
  };
  const handleChangeName = (event: any) => {
    const newCV = { ...cv };
    newCV.name = event.target.value;
    onChangeCV(newCV);
  };
  return (
    <SubCard title={<Text variant="h4">Chỉnh sửa mẫu thiết kế</Text>}>
      <FlexBetween>
        <TextField
          placeholder="CV chưa đặt tên"
          label="Tên CV"
          value={cv.name}
          onChange={handleChangeName}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleReview}
            endIcon={<RemoveRedEyeIcon />}
          >
            Xem trước
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveAndDowload}
            endIcon={<SaveAltIcon />}
          >
            Tải PDF
          </Button>
          <Button
            variant="contained"
            endIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Stack>
      </FlexBetween>
    </SubCard>
  );
};

export default ManageCVHeader;
