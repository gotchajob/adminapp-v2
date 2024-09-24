import Grid from "@mui/material/Grid";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import EarningCard from "components/common/dashboard/label/earning-card";
import { cookies } from "next/headers";
import { apiServerFetch } from "package/api/api-fetch";
import { getStaffToken } from "package/cookies/token";
import { formatDate, formatNumber } from "package/util";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const Dashboard = async () => {
  const accessToken = await getStaffToken(cookies());
  const currentDate = new Date();
  const data1 = await apiServerFetch(
    "/dash-board/total-money",
    "GET",
    undefined,
    accessToken
  );
  const data2 = await apiServerFetch(
    "/dash-board/deposit?year=" + formatDate(currentDate.toISOString(), "yyyy"),
    "GET",
    undefined,
    accessToken
  );
  const data3 = await apiServerFetch(
    "/dash-board/revenue?year=" + formatDate(currentDate.toISOString(), "yyyy"),
    "GET",
    undefined,
    accessToken
  );
  const data4 = await apiServerFetch(
    "/dash-board/total-booking",
    "GET",
    undefined,
    accessToken
  );
  const data5 = await apiServerFetch(
    "/dash-board/booking?year=" + formatDate(currentDate.toISOString(), "yyyy"),
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
            mainTitle: `${formatNumber(data1.data.totalDeposit)}đ`,
            subTitle: "Số tiền nạp vào hệ thống",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: `${formatNumber(data1.data.totalRevenue)}đ`,
            subTitle: "Số tiền hoa hồng",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#c0627d",
            mainTitle: `${formatNumber(data1.data.totalWithDraw)}đ`,
            subTitle: "Số tiền trả cho chuyên gia",
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <BarChart
          mainTitle="Số tiền nạp vào hệ thống"
          height={400}
          barChartProps={{
            categories: listMonth.map((month) => `Tháng ${month}`),
            colors: ["#5799e7"],
            series: [
              {
                data: listMonth.map((month) => {
                  const found = data2.data.find(
                    (value: any) => value.month === month
                  );
                  return found ? found.amount : 0;
                }),
                name: "Tiền nạp",
                type: "bar",
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <BarChart
          mainTitle="Số tiền hoa hồng"
          height={400}
          barChartProps={{
            categories: listMonth.map((month) => `Tháng ${month}`),
            colors: ["#44c097"],
            series: [
              {
                data: listMonth.map((month) => {
                  const found = data3.data.find(
                    (value: any) => value.month === month
                  );
                  return found ? found.amount : 0;
                }),
                name: "Tiền nạp",
                type: "bar",
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: data4.data.totalBooking,
            subTitle: "Lượt đăng kí dịch vụ",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: data4.data.totalCompleteBooking,
            subTitle: "Số dịch vụ hoàn thành",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: `${formatNumber(data4.data.totalPayForService)}đ`,
            subTitle: "Số tiền thanh toán dịch vụ",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <BarChart
          mainTitle="Thống kê đăng kí dịch vụ"
          height={600}
          barChartProps={{
            categories: listMonth.map((month) => `Tháng ${month}`),
            colors: ["#44c097", "#445297", "#793fb7"],
            series: [
              {
                data: listMonth.map((month) => {
                  const found = data5.data.find(
                    (value: any) => value.month === month
                  );
                  return found ? found.bookingFinish : 0;
                }),
                name: "Hoàn thành",
                type: "bar",
              },
              {
                data: listMonth.map((month) => {
                  const found = data5.data.find(
                    (value: any) => value.month === month
                  );
                  return found ? found.bookingCancelByExpert : 0;
                }),
                name: "Hủy bởi chuyên gia",
                type: "bar",
              },
              {
                data: listMonth.map((month) => {
                  const found = data5.data.find(
                    (value: any) => value.month === month
                  );
                  return found ? found.bookingCancelByCustomer : 0;
                }),
                name: "Hủy bởi khách hàng",
                type: "bar",
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
