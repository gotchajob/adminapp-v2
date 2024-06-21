import { useGetExpertFormRequire } from "hooks/use-get-expert-form-require";
import { Category } from "package/api/category";
import { useState } from "react";
import { Text } from "views/forms/input/text/text";
import { PRIMARYCOLOR } from "views/forms/input/config";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
export const ExpertFormRequirePopup = ({
  categories,
}: {
  categories: Category[];
}) => {
  const { expertFormRequire } = useGetExpertFormRequire({
    categoryId: categories[0]?.id || 0,
  });
  const [openRequire, setOpenRequire] = useState(false);
  return (
    <>
      {categories.length > 0 ? (
        <Text
          ml={1}
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          color={"error"}
          onClick={() => {
            setOpenRequire(true);
          }}
        >
          <em> Lưu ý: khi đăng kí kĩ năng tư vấn</em>
        </Text>
      ) : null}
      <Dialog open={openRequire} maxWidth="sm" fullWidth>
        <DialogTitle color={PRIMARYCOLOR} textAlign={"center"}>
          Yêu cầu khi đăng kí tư vấn
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ overflowY: "scroll" }}>
          {expertFormRequire.map((require, index) => (
            <Box key={index} mb={2}>
              <Text fontSize={16} fontWeight={"bold"}>
                {index + 1}. {require.name}
              </Text>
              <Text fontSize={14}>{require.description}</Text>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenRequire(false);
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
