import Box, { BoxProps } from "@mui/material/Box";

export const FlexBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      {...props}
    >
      {children}
    </Box>
  );
};
export const FlexBetween = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      {children}
    </Box>
  );
};

export const FlexCenter = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      {children}
    </Box>
  );
};
