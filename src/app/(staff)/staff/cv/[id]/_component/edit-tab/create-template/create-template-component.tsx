import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  componentDataTypeOption,
  CVComponent,
} from "components/cv-component/interface";
import { useState } from "react";
import { GetIcon } from "./get-icon";
import { Text } from "components/common/text/text";

export const CreateTemplateComponent = ({
  setTemplateComponent,
  open,
  setOpen,
}: {
  setTemplateComponent: (value: CVComponent) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [componentName, setComponentName] = useState("");
  const [title, setTitle] = useState("");
  const [dataType, setDataType] = useState("");
  const [icon, setIcon] = useState("");

  const handleSetTemplateComponent = () => {
    const newTemplateComponent: CVComponent= {
      componentName,
      dataType,
      title,
      icon,
      //@ts-ignore
      ...initTemplate[dataType]
    }

    setTemplateComponent(newTemplateComponent)
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle align="center"> Tạo mới danh mục</DialogTitle>
      <DialogContent sx={{ pt: "10px !important" }}>
        <Stack spacing={2}>
          <TextField
            label="Nhập tên danh mục"
            value={componentName}
            onChange={(e) => {
              setComponentName(e.target.value);
            }}
            fullWidth
          />
          <TextField
            label="Nhập mô tả danh mục"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
          />
          <TextField
            label="Chọn kiểu danh mục"
            value={dataType}
            fullWidth
            select
          >
            {componentDataTypeOption.map((option) => (
              <MenuItem
                key={option.dataType}
                value={option.dataType}
                onClick={() => {
                  setDataType(option.dataType);
                }}
              >
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Text variant="h5">Chọn Icon:</Text>
          <GetIcon setIcon={setIcon} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Đóng
        </Button>
        <Button onClick={handleSetTemplateComponent}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

const initTemplate = {
  image: {
    header: "Image",
    description:
      "https://th.bing.com/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  information: {
    header:
      '<p><strong><span style="font-size: 14pt; color: rgb(35, 111, 161);">Personal Details</span></strong></p>',
    description: "",
  },
  text: {
    header:
      '<p><strong><span style="font-size: 14pt; color: rgb(35, 111, 161);">Header Title</span></strong></p>',
    description: "<p>Input description</p>",
  },
  default: {
    header: "",
    description: "<p>Input description</p>",
  },
};
