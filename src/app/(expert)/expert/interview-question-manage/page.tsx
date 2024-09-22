"use client";

import { Box, Stack } from "@mui/material";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { CategoryTable } from "./_component/CategoryTable";
import { InterviewQuestionTable } from "./_component/InterviewQuestionTable";

const InterViewQuestionManagePage = () => {
  const { expertToken } = ExpertToken();
  const { refresh, refreshTime } = useRefresh();

  return (
    <Stack direction="column" spacing={2}>
      <CategoryTable
        refresh={refresh}
        refreshTime={refreshTime}
        token={expertToken}
      />
      <InterviewQuestionTable
        refresh={refresh}
        refreshTime={refreshTime}
        token={expertToken}
      />
    </Stack>
  );
};

export default InterViewQuestionManagePage;
