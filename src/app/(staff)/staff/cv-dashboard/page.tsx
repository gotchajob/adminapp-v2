import Grid from "@mui/material/Grid";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import { PieChart } from "components/common/dashboard/chart/pie-chart";
import EarningCard from "components/common/dashboard/label/earning-card";
import { Text } from "components/common/text/text";
import { cookies } from "next/headers";
import { apiServerFetch } from "package/api/api-fetch";
import { getExpertToken } from "package/cookies/token";
import MainCard from "ui-component/cards/MainCard";

export default async function Page() {
  const accessToken = await getExpertToken(cookies());
  const data1 = await apiServerFetch(
    "/dash-board/cv-template",
    "GET",
    undefined,
    accessToken
  );
  const data2 = await apiServerFetch(
    "/dash-board/cv",
    "GET",
    undefined,
    accessToken
  );
  const data3 = await apiServerFetch(
    "/dash-board/total-cv",
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
            mainTitle: data3.data.totalCv,
            subTitle: "Tổng CV được tạo",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: data3.data.newCv,
            subTitle: "Số CV được tạo mới",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: data3.data.cvBooking,
            subTitle: "Số CV được review",
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <BarChart
          mainTitle="Số lượng mẫu CV theo danh mục"
          height={400}
          barChartProps={{
            categories: data1.data.map(
              (cv: any) => `Danh mục ${cv.category}`
            ),
            series: [
              {
                data: data1.data.map((cv: any) => cv.countCvTemplate),
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
            labels: data2.data.map(
              (cv: any) => `Danh mục ${cv.cvCategory}`
            ),
            series: data2.data.map((cv: any) => cv.countCv),
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
