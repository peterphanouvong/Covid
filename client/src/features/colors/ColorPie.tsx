import React, { useEffect } from "react";
import * as d3 from "d3";

import { PieArcDatum } from "d3-shape";
import { Types } from "../../app/models/types";

interface Props {
  width: number;
  height: number;
  left: number;
  right: number;
  bottom: number;
  top: number;
}

const ColorPie = (props: Props) => {
  useEffect(() => {
    draw();
  });

  const draw = () => {
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(".basicPieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    d3.dsv(
      ",",
      "https://gist.githubusercontent.com/peterphanouvong/3e02501549ee33fe0f59bf8c38ae9e32/raw/Colors.csv",
      (d) => {
        const res = (d as unknown) as Types.Data;
        return res;
      }
    ).then((data) => {
      const pie = d3
        .pie<Types.Data>()
        .sort((a, b) => {
          return a["RGB hex value"].localeCompare(b["RGB hex value"]);
        })
        .value(1);

      const path = d3
        .arc<PieArcDatum<Types.Data>>()
        .innerRadius(0)
        .outerRadius(radius);

      const pieData = pie(data);

      const arch = svg
        .selectAll(".arc")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("fill", (d) => {
          return d.data["RGB hex value"];
        });

      arch.append("path").attr("d", path);
    });
  };
  return <div className="basicPieChart"></div>;
};

export { ColorPie };
