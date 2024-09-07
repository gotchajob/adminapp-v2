import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import Grid from "@mui/material/Grid";
import { BarChart } from "components/common/dashboard/chart/bar-chart";
import EarningCard from "components/common/dashboard/label/earning-card";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: "500.000đ",
            subTitle: "Số tiền nạp vào hệ thống",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: "500.000đ",
            subTitle: "Số tiền hoa hồng",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#c0627d",
            mainTitle: "500.000đ",
            subTitle: "Số tiền trả cho chuyên gia",
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <BarChart
          mainTitle="Số tiền nạp vào hệ thống"
          height={400}
          barChartProps={{
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
              (month) => `Tháng ${month}`
            ),
            colors: ["#5799e7"],
            series: [
              {
                data: [
                  502000, 622000, 12000, 780000, 422200, 500000, 500000, 500000,
                  0, 0, 0, 0,
                ],
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
              (month) => `Tháng ${month}`
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
        <EarningCard
          data={{
            bgcolor: "#4c85c9",
            mainTitle: "120",
            subTitle: "Lượt đăng kí dịch vụ",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: "500",
            subTitle: "Số dịch vụ hoàn thành",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EarningCard
          data={{
            bgcolor: "#3ba783",
            mainTitle: "500.000đ",
            subTitle: "Số tiền thanh toán dịch vụ",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <BarChart
          mainTitle="Thống kê đăng kí dịch vụ"
          height={600}
          barChartProps={{
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
              (month) => `Tháng ${month}`
            ),
            colors: ["#44c097", "#445297"],
            series: [
              {
                data: [
                  502000, 622000, 12000, 780000, 422200, 500000, 500000, 500000,
                  0, 0, 0, 0,
                ],
                name: "Hoàn thành",
                type: "bar",
              },
              {
                data: [
                  502000, 622000, 12000, 780000, 422200, 500000, 500000, 500000,
                  0, 0, 0, 0,
                ],
                name: "Hủy bởi chuyên gia",
                type: "bar",
              },
              {
                data: [
                  502000, 622000, 12000, 780000, 422200, 500000, 500000, 500000,
                  0, 0, 0, 0,
                ],
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
