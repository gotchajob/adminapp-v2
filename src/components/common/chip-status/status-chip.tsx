"use client";

import Chip from "@mui/material/Chip";
import { useTheme, alpha } from "@mui/material/styles";
export interface StatusChipParams {
  label: string;
  color: "success" | "warning" | "error" | string;
}
export const StatusChip = ({ label, color }: StatusChipParams) => {
  const theme = useTheme();
  const type = {
    success: ["success.dark", alpha(theme.palette.success.light, 0.6)],
    error: ["orange.dark", alpha(theme.palette.orange.light, 0.8)],
    warning: ["warning.dark", "warning.light"],
  };
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        //@ts-ignore
        color: type[color][0],
        //@ts-ignore
        bgcolor: type[color][1],
      }}
    />
  );
};
