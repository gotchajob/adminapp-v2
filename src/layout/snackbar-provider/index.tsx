"use client";
import { styled } from "@mui/material/styles";
import { SnackbarProvider as NotistackProvider } from "notistack";

// styled component
const Provider = styled(NotistackProvider)(() => ({
  "&.SnackbarContent-root.SnackbarItem-contentRoot": {
    boxShadow: "1px 1px 1px black",
    color: "black",
    background: "white",
    fontFamily: "Roboto",
  },

  "&.SnackbarItem-variantSuccess .MuiSvgIcon-root": {
    color: "rgb(46, 125, 50)",
  },
  "&.SnackbarItem-variantError .MuiSvgIcon-root": {
    color: "rgb(211, 47, 47)",
  },
}));

// ========================================
type Props = { children: any };
// ========================================

const SnackbarProvider = ({ children }: Props) => {
  return (
    <Provider
      maxSnack={4}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      classes={{
        containerRoot: "z-alert",
      }}
    >
      {children}
    </Provider>
  );
};

export default SnackbarProvider;
