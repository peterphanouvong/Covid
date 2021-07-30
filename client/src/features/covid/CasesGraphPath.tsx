import { observer } from "mobx-react-lite";
import React, { useState, Fragment } from "react";
import * as d3 from "d3";

import { CovidData } from "../../app/models/covidData";
import { useStore } from "../../app/stores/store";
import { getColor } from "../../app/utils/colors";
import "./CasesGraph.css";

interface Props {
  location: string;
  i: number;
  value: CovidData[];
  width: number;
  endHeight: number;
  line: d3.Line<[number, number]>;
  mouse: {
    x: number;
    y: number;
  };
  y: any;
  x: any;
}

const _CasesGraphPath = ({
  location,
  i,
  value,
  width,
  endHeight,
  line,
  mouse,
  y,
  x,
}: Props) => {
  const { covidStore } = useStore();
  const { overlayActive } = covidStore;

  const [active, setActive] = useState(false);

  const handleMouseOver = () => {
    setActive(true);
  };

  const handleMouseOut = () => {
    setActive(false);
  };

  const bisect = d3.bisector((d: CovidData) => {
    return d.date;
  }).left;

  const color = getColor(i);

  return (
    <Fragment>
      <path
        id={location}
        className={`line case-graph__path ${
          (active || overlayActive) && "case-graph__path--active"
        }`}
        fill="none"
        stroke={color}
        // @ts-ignore
        d={line(value)}
      ></path>

      <path
        className="case-graph__dash"
        d={`M ${width + 3},${endHeight} ${width + 25},${endHeight}`}
      />
      <text
        className="case-graph__location-label"
        x={width + 27}
        y={endHeight + 4}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {location}
      </text>
      <circle
        cx={mouse.x}
        cy={y(value[bisect(value, x.invert(mouse.x))].cases_per_million)}
        fill={color}
        className={`case-graph__dot ${
          overlayActive && "case-graph__dot--active"
        }`}
        r="4"
      ></circle>
    </Fragment>
  );
};

export const CasesGraphPath = observer(_CasesGraphPath);
