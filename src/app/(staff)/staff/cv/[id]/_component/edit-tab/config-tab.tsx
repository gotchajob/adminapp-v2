import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { FlexBetween, FlexBox } from "components/common/box/flex-box";
import { Text } from "components/common/text/text";
import {
  Column,
  CVTemplate,
  SampleColumn,
} from "components/cv-component/interface";
import { HexColorPicker } from "react-colorful";
import SubCard from "ui-component/cards/SubCard";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

export const ConfigTab = ({
  cv,
  onChangeCV,
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
}) => {
  const handleUpdateColumnColor = (color: string, columnIndex: number) => {
    const newCV = { ...cv };
    newCV.layout[columnIndex].backgroudColor = color;
    onChangeCV(newCV);
  };

  const handleUpdateColumnRow = (scale: string, columnIndex: number) => {
    const newCV = { ...cv };
    const newScale: number[] = [];
    scale.split(" - ").forEach((value) => {
      try {
        const number = Number.parseInt(value);
        newScale.push(number);
      } catch (error) {}
    });
    if (newScale.length > 0) {
      newCV.layout[columnIndex].componentSize = newScale;
    }
    onChangeCV(newCV);
  };

  const handleUpdateColumnSize = (size: number, columnIndex: number) => {
    const newCV = { ...cv };
    newCV.layout[columnIndex].size = size;
    onChangeCV(newCV);
  };

  const handleDeleteColumn = (columnIndex: number) => {
    const newCV = { ...cv };
    newCV.layout.splice(columnIndex, 1);
    onChangeCV(newCV);
  };

  const RenderColumnConfig = ({
    column,
    index,
  }: {
    column: Column;
    index: number;
  }) => {
    return (
      <Stack spacing={2} key={index}>
        <FlexBetween>
          <Text fontWeight={"bold"}>Cấu hình cột {index + 1}</Text>
          <IconButton
            size="small"
            onClick={() => {
              handleDeleteColumn(index);
            }}
          >
            <ClearIcon color="error" />
          </IconButton>
        </FlexBetween>
        <Stack spacing={0}>
          <Text fontWeight={"bold"}>Màu nền</Text>
          <FlexBox>
            <Input
              defaultValue={column.backgroudColor}
              onBlur={(e) => {
                handleUpdateColumnColor(e.target.value, index);
              }}
            />
            <RenderColor color={column.backgroudColor} />
          </FlexBox>
        </Stack>
        <Stack spacing={0}>
          <Text fontWeight={"bold"}>Định dạng cột</Text>
          <FlexBox>
            <Input
              defaultValue={column.componentSize.join(" - ")}
              onBlur={(e) => {
                handleUpdateColumnRow(e.target.value, index);
              }}
            />
          </FlexBox>
        </Stack>
        <Stack spacing={0}>
          <Text fontWeight={"bold"}>Kích thước cột</Text>
          <FlexBox>
            <Input
              defaultValue={column.size}
              onBlur={(e) => {
                handleUpdateColumnSize(+e.target.value, index);
              }}
            />
          </FlexBox>
        </Stack>
        <Divider />
      </Stack>
    );
  };

  const handleAddingNewColumn = () => {
    if (cv.layout.length < 3) {
      const newCV = { ...cv };

      newCV.layout.push(SampleColumn);

      const avgSize = 12 / newCV.layout.length;
      newCV.layout.forEach((column, index) => {
        newCV.layout[index].size = avgSize;
      });

      onChangeCV(newCV);
    }
  };

  const RenderNumberColumnConfig = (
    <Stack spacing={1}>
      <Text fontWeight={"bold"}>Tổng số cột: {cv.layout.length}</Text>
      <Button variant="contained" onClick={handleAddingNewColumn}>
        Thêm cột
      </Button>
    </Stack>
  );

  const [primaryColor, setPrimaryColor] = useState(cv.primaryColor);

  const handleUpdatePrimaryColor = (color: string) => {
    const newCV = { ...cv };
    newCV.primaryColor = color;
    onChangeCV(newCV);
  };

  const RenderPrimaryColor = (
    <Stack spacing={0}>
      <Text fontWeight={"bold"}>Màu viền</Text>
      <FlexBox>
        <Input
          defaultValue={cv.primaryColor}
          onBlur={(e) => {
            handleUpdatePrimaryColor(e.target.value);
          }}
        />
        <RenderColor color={cv.primaryColor} />
      </FlexBox>
    </Stack>
  );

  return (
    <SubCard title={"Cấu hình"}>
      <Stack spacing={4}>
        {RenderPrimaryColor}
        {cv.layout.map((column, index) => (
          <RenderColumnConfig key={index} column={column} index={index} />
        ))}
        {RenderNumberColumnConfig}
      </Stack>
    </SubCard>
  );
};

const RenderColor = ({ color }: { color: string }) => {
  return (
    <Box
      ml={2}
      bgcolor={color}
      width={25}
      height={25}
      borderRadius={"50%"}
    ></Box>
  );
};
