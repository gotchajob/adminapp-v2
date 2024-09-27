import {
  Box,
  Button,
  Grid,
  Input,
  IconButton,
  Tooltip,
  Stack,
  Switch,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid/models";
import { FlexBox } from "components/common/box/flex-box";
import {
  DataGridTable,
  DataGridTableProps,
} from "components/common/filter-table/data-grid";
import { useGetFilter } from "components/common/filter-table/hook-filter";
import { useMemo } from "react";
import MainCard from "ui-component/cards/MainCard";
import { formatDate } from "package/util";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BlogCategory } from "package/api/blog-category";

export const RenderBlogCategoryTable = ({
  blogCategoryList,
}: {
  blogCategoryList: BlogCategory[];
}) => {
  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Tên danh mục",
      flex: 2,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 3,
      renderCell: (params) => (
        <Box sx={{ wordWrap: "break-word", whiteSpace: "normal" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Thao tác",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Switch checked={true} />
          {/* <Tooltip title="Sửa">
                        <IconButton
                            color="primary"
                            onClick={() => handleEdit(params.row.id)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton
                            color="error"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> */}
        </Stack>
      ),
    },
  ];

  // Filter functionality
  const { handleChangeEventText, text } = useGetFilter();

  const filteredData = useMemo(() => {
    const lowerCaseText = text.toLowerCase();
    return blogCategoryList.filter(
      (category) =>
        category.id.toString().includes(lowerCaseText) ||
        category.category.toLowerCase().includes(lowerCaseText) ||
        category.description.toLowerCase().includes(lowerCaseText)
      // formatDate(category.createdAt, 'dd/MM/yyyy').toLowerCase().includes(lowerCaseText)
    );
  }, [text, blogCategoryList]);

  const RenderClientFilter = (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <FlexBox>
          <Button>Tìm kiếm</Button>
          <Input
            size="small"
            onChange={handleChangeEventText}
            placeholder="Tìm kiếm..."
          />
        </FlexBox>
      </Grid>
      <Grid item xs={12} lg={8}>
        <FlexBox justifyContent={"right"}>
          {/* Additional actions can be added here */}
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
