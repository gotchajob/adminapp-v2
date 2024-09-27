import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import { PieChart } from "components/common/dashboard/chart/pie-chart";
import EarningCard from "components/common/dashboard/label/earning-card";
import { Text } from "components/common/text/text";
import { cookies } from "next/headers";
import { apiServerFetch } from "package/api/api-fetch";
import { getExpertToken, getStaffToken } from "package/cookies/token";
import MainCard from "ui-component/cards/MainCard";

export default async function Page() {
  const accessToken = await getStaffToken(cookies());
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
  const data4 = await apiServerFetch(
    "/dash-board/top-cv-template?sort=asc&size=5",
    "GET",
    undefined,
    accessToken
  );
  const data5 = await apiServerFetch(
    "/dash-board/top-cv-template?sort=desc&size=5",
    "GET",
    undefined,
    accessToken
  );

  let mergeList = [...data5.data, ...data4.data.reverse()];
  if (mergeList.length < 10) {
    mergeList = [...data5.data];
  }
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
            categories: data1.data.map((cv: any) => `Danh mục ${cv.category}`),
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
            labels: data2.data.map((cv: any) => `Danh mục ${cv.cvCategory}`),
            series: data2.data.map((cv: any) => cv.countCv),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <MainCard
          title={<Text variant="h4">Mẫu CV được sử dụng nhiều nhất</Text>}
          align="center"
        >
          <Grid container spacing={3}>
            {mergeList.map((cv, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Avatar alt="User 1" src={cv.image} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" textAlign={"left"}>
                      {cv.name}
                    </Typography>
                    <Typography variant="subtitle2" textAlign={"left"}>
                      {cv.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption">
                      {cv.numberCv} lượt sử dụng
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={6}>
        <MainCard
          title={<Text variant="h4">Mẫu CV ít được sử dụng</Text>}
          align="center"
        >
          <Grid container spacing={3}>
            {mergeList.length > 10 && mergeList.reverse().map((cv, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Avatar alt="User 1" src={cv.image} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" textAlign={"left"}>
                      {cv.name}
                    </Typography>
                    <Typography variant="subtitle2" textAlign={"left"}>
                      {cv.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption">
                      {cv.numberCv} lượt sử dụng
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
