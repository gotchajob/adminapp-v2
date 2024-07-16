import Typography, { TypographyProps } from "@mui/material/Typography";
import { PRIMARYCOLOR } from "../config";

export const maxLineStyle = (maxLine: number) => {
  return {
    maxHeight: `${1.3 * maxLine}em`, // Chiều cao tối đa của 2 dòng với line-height 1.5
    lineHeight: `1.2`,
    overflow: "hidden",
    textverflow: "ellipsis",
  };
};

//@ts-ignore
export const Text = ({ children, ...props }: TypographyProps) => {
  return <Typography {...props}>{children}</Typography>;
};

export const MainTitle = ({ children, ...props }: TypographyProps) => {
  return (
    <Text
      color={PRIMARYCOLOR}
      textAlign={"center"}
      fontWeight={900}
      fontSize={35}
      {...props}
    >
      {children}
    </Text>
  );
};

export const SubTitle = ({ children, ...props }: TypographyProps) => {
  return (
    <Text
      color={PRIMARYCOLOR}
      textAlign={"center"}
      fontWeight={700}
      fontSize={30}
      {...props}
    >
      {children}
    </Text>
  );
};
