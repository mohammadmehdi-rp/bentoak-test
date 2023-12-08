import { CircularProgress, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "layouts";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Cell, Pie, PieChart } from "recharts";
import { TComments, TPosts } from "types";
import { QUERY_KEYS } from "utils";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#6050DC",
  "#D52DB7",
  "#FF2E7E",
  "#FF6B45",
  "#FFAB05",
  "#52D726",
];

function DashboardChartsPage() {
  const {
    isLoading,
    isRefetching,
    data: postData,
  } = useQuery<TPosts[]>(QUERY_KEYS.products, () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    )
  );

  const {
    isLoading: isLoadingComments,
    isRefetching: isRefetchingComments,
    data: commentsData,
  } = useQuery<TComments[]>(QUERY_KEYS.comments, () =>
    fetch("https://jsonplaceholder.typicode.com/comments?postId=1").then(
      (res) => res.json()
    )
  );

  // Calculate how many posts each user has written
  const postDataCounts = useMemo(() => {
    const postsCount: { name: string; value: number }[] = [];
    postData?.map((post) => {
      if (postsCount[post.userId])
        postsCount[post.userId] = {
          name: `UserId ${post.userId.toString()}`,
          value: postsCount[post.userId].value + 1,
        };
      else
        postsCount[post.userId] = {
          value: 1,
          name: `UserId ${post.userId.toString()}`,
        };
    });
    return postsCount.slice(1, postsCount.length);
  }, [postData]);

  return (
    <DashboardLayout>
      {isLoading || isRefetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container marginBottom={"16px"} rowSpacing={1}>
            <Grid style={{ display: "flex", alignSelf: "center" }} item md={6}>
              <Typography
                style={{
                  fontWeight: "600",
                }}
              >
                Charts
              </Typography>
            </Grid>
          </Grid>
          <Grid container marginBottom={"20px"} rowSpacing={1}>
            <Grid style={{ display: "flex", alignSelf: "center" }} item md={6}>
              {/* <LineChart
                width={400}
                height={400}
                data={postDataCounts}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey={"count"}
                  stroke="#387908"
                  yAxisId={1}
                />
              </LineChart> */}
            </Grid>
            <Grid style={{ alignSelf: "center" }} item md={6}>
              <PieChart width={800} height={400}>
                <Pie
                  data={postDataCounts}
                  cx={120}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {postData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <Typography style={{ fontWeight: "600", marginLeft: "30px" }}>
                Posts each user has written
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </DashboardLayout>
  );
}

export default DashboardChartsPage;
