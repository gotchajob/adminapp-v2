import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FlexCenter } from "components/common/box/flex-box";
import { PRIMARYCOLOR } from "components/common/config";
import Iconify from "components/iconify/iconify";
import { useState } from "react";

const sampleIcon = [
  "icon-park-outline:avatar",
  "tdesign:personal-information",
  "mingcute:pencil-line",
  "ph:target",
  "bytesize:work",
  "mdi:certificate",
];
export const GetIcon = ({ setIcon }: { setIcon: (value: string) => void }) => {
  const [selectedIcon, setSelectedIcon] = useState("");
  return (
    <Grid container spacing={0}>
      {sampleIcon.map((icon, index) => (
        <Grid
          item
          sx={{ cursor: "pointer" }}
          xs={2.4}
          onClick={() => {
            setIcon(icon);
            setSelectedIcon(icon);
          }}
        >
          <Button
            fullWidth
            variant={selectedIcon === icon ? "contained" : "outlined"}
            sx={{ py: 1 }}
          >
            <Iconify
              width={25}
              icon={icon}
              key={index}
              color={selectedIcon === icon ? "white" : PRIMARYCOLOR}
            />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
