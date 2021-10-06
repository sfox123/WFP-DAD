import React from "react";
import { Chart } from "react-google-charts";

export default function BarChart(props) {
  const { data } = props;
  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          // Material design options
          chart: {
            title: "Tank-Water Level",
            subtitle: "2021",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}
