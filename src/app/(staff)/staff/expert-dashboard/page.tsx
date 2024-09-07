import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import Grid from "@mui/material/Grid";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import EarningCard from "components/common/dashboard/label/earning-card";
import { Text } from "components/common/text/text";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: "500.000đ",
            subTitle: "Tổng số chuyên gia",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: "500.000đ",
            subTitle: "Số chuyên gia mới trong tháng",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#c0627d",
            mainTitle: "500.000đ",
            subTitle: "Số lượt đăng kí chuyên gia",
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <BarChart
          mainTitle="Số chuyên gia theo ngành nghề"
          height={600}
          barChartProps={{
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
              (month) => `Ngành ${month}`
            ),
            colors: ["#44c097"],
            series: [
              {
                data: [
                  502000, 622000, 12000, 780000, 422200, 500000, 500000, 500000,
                  0, 0, 0, 0,
                ],
                name: "Tiền hoa hồng",
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
