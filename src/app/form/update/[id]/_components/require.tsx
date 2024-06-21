import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useGetRegisterCriteria } from "hooks/use-get-request-criteria";
import { Text } from "views/forms/input/text/text";

export const RequireForm = ({
  requestId,
  note,
}: {
  requestId: number;
  note: string;
}) => {
  const { registerCriteria } = useGetRegisterCriteria({ requestId });
  return (
    <Grid container spacing={2}>
      {registerCriteria.map((require, index) => (
        <Grid item xs={6} key={index}>
          <Box key={index} mb={2} maxWidth={450}>
            <Text fontSize={16} fontWeight={"bold"} color={"error"}>
              {index + 1}. {require.criteria}
            </Text>
            <Text fontSize={14}>{require.description}</Text>
          </Box>
        </Grid>
      ))}
      <Grid item xs={12}>
        <TextField
          size="medium"
          value={note}
          variant="filled"
          label="Nội dung từ chối"
          fullWidth
          minRows={4}
          multiline
          sx={{ mt: 2 }}
        />
      </Grid>
    </Grid>
  );
};
