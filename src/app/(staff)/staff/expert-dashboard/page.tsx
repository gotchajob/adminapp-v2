import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import Grid from "@mui/material/Grid";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import EarningCard from "components/common/dashboard/label/earning-card";
import { Text } from "components/common/text/text";
import { cookies } from "next/headers";
import { apiServerFetch } from "package/api/api-fetch";
import { getExpertToken } from "package/cookies/token";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = async() => {
  const accessToken = await getExpertToken(cookies());
  const data1 = await apiServerFetch(
    "/dash-board/total-expert",
    "GET",
    undefined,
    accessToken
  );
  const data2 = await apiServerFetch(
    "/dash-board/expert",
    "GET",
    undefined,
    accessToken
  );
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: data1.data.totalExpert,
            subTitle: "Tổng số chuyên gia",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: data1.data.newExpert,
            subTitle: "Số chuyên gia mới trong tháng",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#c0627d",
            mainTitle: data1.data.totalExpertRegister,
            subTitle: "Số lượt đăng kí chuyên gia",
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <BarChart
          mainTitle="Số chuyên gia theo ngành nghề"
          height={600}
          barChartProps={{
            categories: data2.data.map(
              (cv: any) => `Danh mục ${cv.category}`
            ),
            series: [
              {
                data: data2.data.map((cv: any) => cv.countExpert),
                name: "Chuyên gia",
                type: "bar",
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <MainCard
          title={<Text variant="h4">Top chuyên gia có lượt booking cao nhất</Text>}
          align="center"
        ></MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
