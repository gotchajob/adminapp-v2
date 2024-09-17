import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { PostCategory } from "package/api/category";
import { DelCategory, PatchCategory } from "package/api/category/id";
import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { RenderCategoryControllerTable } from "./CategoryControllerTable";

interface Category {
  name: string;
  id: number;
}

interface CategoryControllerPageProps {
  token: string;
  category: Category[];
  refresh: () => void;
}

export function CategoryControllerPage({
  token,
  category,
  refresh,
}: CategoryControllerPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", id: 0 });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setNewCategory({ name: category.name, id: category.id });
    setOpenEditDialog(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleAdd = async () => {
    try {
      if (!newCategory.name) {
        enqueueSnackbar("Vui lòng nhập tên danh mục", { variant: "warning" });
        return;
      }

      const response = await PostCategory({ name: newCategory.name });
      if (response.status === "success") {
        refresh();
        setOpenAddDialog(false);
        setNewCategory({ name: "", id: 0 });
        enqueueSnackbar("Thêm mới danh mục thành công", { variant: "success" });
      } else {
        throw new Error(response.responseText || "Không thể thêm danh mục");
      }
    } catch (error: any) {
      console.error("Error adding category:", error);
      enqueueSnackbar(error.responseText || "Thêm mới danh mục thất bại", { variant: "error" });
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedCategory || !newCategory.name) {
        enqueueSnackbar("Vui lòng chọn danh mục và nhập tên danh mục", { variant: "warning" });
        return;
      }

      const response = await PatchCategory({ id: selectedCategory.id, name: newCategory.name });
      if (response.status === "success") {
        refresh();
        setOpenEditDialog(false);
        setSelectedCategory(null);
        setNewCategory({ name: "", id: 0 });
        enqueueSnackbar("Sửa danh mục thành công", { variant: "success" });
      } else {
        throw new Error(response.responseText || "Không thể sửa danh mục");
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
      enqueueSnackbar(error.responseText || "Sửa danh mục thất bại", { variant: "error" });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedCategory) {
        enqueueSnackbar("Vui lòng chọn danh mục để xóa", { variant: "warning" });
        return;
      }

      const response = await DelCategory({ id: selectedCategory.id });
      if (response.status === "success") {
        refresh();
        setOpenDeleteDialog(false);
        setSelectedCategory(null);
        enqueueSnackbar("Xóa danh mục thành công", { variant: "success" });
      } else {
        throw new Error(response.responseText || "Không thể xóa danh mục");
      }
    } catch (error: any) {
      console.error("Error deleting category:", error);
      enqueueSnackbar(error.responseText || "Xóa danh mục thất bại", { variant: "error" });
    }
  };

  return (
    <MainCard
      title={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            Quản lí danh mục
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Thêm danh mục
          </Button>
        </Box>
      }
      sx={{ mt: 3 }}
    >

      {category && (
        <RenderCategoryControllerTable
          category={category}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {/* Dialog thêm danh mục */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Thêm danh mục</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Tên danh mục"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Hủy</Button>
          <Button onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog sửa danh mục */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Sửa danh mục</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Tên danh mục"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button onClick={handleUpdate}>Cập nhật</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xóa danh mục */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Xóa danh mục</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa danh mục {selectedCategory?.name} không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}

{/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên danh mục</TableCell>
              <TableCell>Quản lí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Tooltip title="Sửa">
                    <IconButton onClick={() => handleEdit(category)}>
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton onClick={() => handleDelete(category)}>
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
