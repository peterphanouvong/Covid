import React, { useRef, useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import * as d3 from "d3";

import "./CasesGraph.css";
import { useStore } from "../../app/stores/store";
import { CovidData } from "../../app/models/covidData";
import { CasesGraphPath } from "./CasesGraphPath";
import { CasesGraphOverlay } from "./CasesGraphOverlay";
import { CasesGraphInfoBox } from "./CasesGraphInfoBox";

interface Props {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  fill: string;
}
const _CasesGraph = (props: Props) => {
  const { covidStore } = useStore();
  const { filteredCovidData } = covidStore;
  const [dataMap, setDataMap] = useState<
    d3.InternMap<string, CovidData[]> | undefined
  >(undefined);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const xAxisRef = useRef<SVGSVGElement | null>(null);
  const yAxisRef = useRef<SVGSVGElement | null>(null);

  const width = props.width - props.left - props.right;
  const height = props.height - props.top - props.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  useEffect(() => {
    if (filteredCovidData) {
      setDataMap(d3.group(filteredCovidData, (d) => d.location));
    }
  }, [filteredCovidData]);

  useEffect(() => {
    // add the x Axis
    if (xAxisRef.current)
      d3.select(xAxisRef.current).call(d3.axisBottom(x).ticks(5));
    if (yAxisRef.current) d3.select(yAxisRef.current).call(d3.axisLeft(y));
  }, [x, y]);

  if (!filteredCovidData || !dataMap) return <></>;

  x.domain(
    d3.extent(filteredCovidData, (d) => {
      return d.date;
    }) as [Date, Date]
  );

  y.domain([
    0,
    d3.max(filteredCovidData, (d) => +d.cases_per_million),
  ] as number[]);

  const line = d3
    .line()
    .x((d) => x(((d as unknown) as { date: number }).date))
    .y((d) => y(+((d as unknown) as CovidData).cases_per_million));

  const dataMapArray = Array.from(dataMap);

  return (
    <>
      <h2>Cases per million</h2>
      <div style={{ paddingTop: "2rem" }}></div>
      <svg width={props.width} height={props.height}>
        <g
          ref={svgRef}
          transform={"translate(" + props.left + "," + props.top + ")"}
        >
          {dataMapArray.map(([key, value], i) => {
            const endHeight = y(value[value.length - 1].cases_per_million);
            // console.log(endHeight);
            return (
              <CasesGraphPath
                endHeight={endHeight}
                i={i}
                key={key}
                location={key}
                line={line}
                mouse={mouse}
                width={width}
                value={value}
                y={y}
                x={x}
              />
            );
          })}
          <CasesGraphInfoBox
            dataMapArray={dataMapArray}
            mouse={mouse}
            y={y}
            x={x}
            width={width}
          />

          <CasesGraphOverlay
            mouse={mouse}
            setMouse={setMouse}
            width={width}
            height={height}
          />

          <g ref={xAxisRef} transform={`translate(0,${height})`}></g>
          <g ref={yAxisRef}></g>
        </g>
      </svg>
    </>
  );
};
export const CasesGraph = observer(_CasesGraph);
