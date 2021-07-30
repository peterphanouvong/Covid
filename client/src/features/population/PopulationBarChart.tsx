import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import * as d3 from "d3";

import "./PopulationBarChart.css";
import { Loading } from "../../app/layout/Loading";
import { useStore } from "../../app/stores/store";
import { CountryPopulation } from "../../app/models/countryPopulation";

interface Props {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  fill: string;
}

const _PopulationBarChart = (props: Props) => {
  const { populationStore } = useStore();
  const {
    selectedCountryPopulations,
    setSelectedCountryPopulation,
  } = populationStore;
  const xAxisRef = useRef<SVGSVGElement | null>(null);
  const yAxisRef = useRef<SVGSVGElement | null>(null);

  const width = props.width - props.left - props.right;
  const height = props.height - props.top - props.bottom;

  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([height, 0]);

  const handleClick = (d: CountryPopulation) => {
    setSelectedCountryPopulation(d);
  };

  useEffect(() => {
    // add the x Axis
    if (xAxisRef.current) d3.select(xAxisRef.current).call(d3.axisBottom(x));
    if (yAxisRef.current) d3.select(yAxisRef.current).call(d3.axisLeft(y));
  });

  if (!selectedCountryPopulations) return <Loading content="loading data" />;

  x.domain(selectedCountryPopulations.map((d) => d.country));
  y.domain([
    0,
    d3.max(selectedCountryPopulations, () => {
      return Math.max(
        ...selectedCountryPopulations.map(
          (dt) => (dt as CountryPopulation).population
        ),
        0
      );
    }),
  ] as number[]);

  return (
    <>
      <svg width={props.width} height={props.height}>
        <g transform={`translate(${props.left},${props.top})`}>
          {selectedCountryPopulations.map((d) => (
            <rect
              key={d.id}
              fill={props.fill}
              className="bar"
              x={x(d.country) || 0}
              y={y(d.population)}
              height={height - y(d.population)}
              width={x.bandwidth()}
              onClick={() => handleClick(d)}
            ></rect>
          ))}
          <g ref={xAxisRef} transform={`translate(0,${height})`}></g>
          <g ref={yAxisRef}></g>
        </g>
      </svg>
    </>
  );
};

export const PopulationBarChart = observer(_PopulationBarChart);
