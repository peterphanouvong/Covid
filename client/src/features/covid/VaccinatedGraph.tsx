import React, { useEffect } from "react";
import * as d3 from "d3";
import { useStore } from "../../app/stores/store";
import { Vac } from "../../app/models/vac";
import { useRef } from "react";

interface Props {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  fill: string;
}
const VaccinatedGraph = (props: Props) => {
  const { vaccinationStore } = useStore();
  const { selectedVaccinations } = vaccinationStore;

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;

    if (selectedVaccinations) {
      const svg = d3.select(svgRef.current);

      const sumstat = d3.group(selectedVaccinations, (d) => d.location);

      const x = d3
        .scaleTime()
        .domain(
          d3.extent(selectedVaccinations, (d) => {
            return d.date;
          }) as [Date, Date]
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

      const color = d3
        .scaleOrdinal()
        .range([
          "#e41a1c",
          "#377eb8",
          "#4daf4a",
          "#984ea3",
          "#ff7f00",
          "#ffff33",
          "#a65628",
          "#f781bf",
          "#999999",
        ]);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(selectedVaccinations, (d) => +d.cases_per_million),
        ] as number[])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      console.log("x", x);
      console.log("Y", y);

      const line = svg.selectAll(".line").data(sumstat);

      line
        .join("path")
        .attr("fill", "none")
        .merge(line)
        .transition()
        .duration(500)
        // @ts-ignore
        .attr("stroke", function (d) {
          return color(d[0]);
        })
        .attr("stroke-width", 1.5)
        // @ts-ignore
        .attr("d", (d) => {
          return d3
            .line()
            .x(function (d) {
              return x(((d as unknown) as { date: number }).date);
            })
            .y(function (d) {
              return y(+((d as unknown) as Vac).cases_per_million);
              // @ts-ignore
            })(d[1]);
        });
    }
  }, [props, selectedVaccinations]);

  if (!selectedVaccinations) return <></>;

  const sumstat = d3.group(selectedVaccinations, (d) => d.location);
  const data = Array.from(sumstat).map((val, key) => {
    return { location: val[0], y: val[1] };
  });

  return (
    <>
      <h2>Cases Per Million</h2>
      <div className="vac-line-graph">
        <svg width={props.width} height={props.height}>
          <g
            ref={svgRef}
            transform={"translate(" + props.left + "," + props.top + ")"}
          ></g>
        </svg>
      </div>
      <div>
        {data.map((x) => {
          return <div key={x.location}>{x.location}</div>;
        })}
      </div>
    </>
  );
};

export { VaccinatedGraph };
