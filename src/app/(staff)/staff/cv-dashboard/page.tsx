import Grid from "@mui/material/Grid";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import { PieChart } from "components/common/dashboard/chart/pie-chart";
import EarningCard from "components/common/dashboard/label/earning-card";
import { Text } from "components/common/text/text";
import MainCard from "ui-component/cards/MainCard";

export default async function Page() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: "120",
            subTitle: "Tổng CV được tạo",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: "120",
            subTitle: "Số CV được tạo mới",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: "120",
            subTitle: "Số CV được review",
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <BarChart
          mainTitle="Số lượng mẫu CV theo danh mục"
          height={400}
          barChartProps={{
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
              (month) => `Danh mục ${month}`
            ),
            colors: ["#44c097", "#445297"],
            series: [
              {
                data: [
                  502000, 622000, 12000, 780000, 422200, 500000, 500000, 500000,
                  0, 0,
                ],
                name: "Hoàn thành",
                type: "bar",
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <PieChart
          mainTitle="Danh mục CV được sử dụng"
          height={445}
          pieChartProps={{
            labels: [
              "Ngành IT",
              "Ngành Marketing",
              "Ngành ngoại ngữ",
              "Ngành kinh doanh",
            ],
            series: [400, 345, 110, 728],
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <MainCard
          title={<Text variant="h4">Mẫu CV được sử dụng nhiều nhất</Text>}
          align="center"
        ></MainCard>
      </Grid>
      <Grid item xs={6}>
        <MainCard
          title={<Text variant="h4">Mẫu CV ít được sử dụng</Text>}
          align="center"
        ></MainCard>
      </Grid>
    </Grid>
  );
}
