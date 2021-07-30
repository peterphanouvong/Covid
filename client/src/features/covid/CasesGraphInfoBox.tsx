import { observer } from "mobx-react-lite";
import React from "react";
import * as d3 from "d3";
import { format } from "date-fns";

import "./CasesGraph";
import { CovidData } from "../../app/models/covidData";
import { useStore } from "../../app/stores/store";
import { getColor } from "../../app/utils/colors";

interface Props {
  dataMapArray: [string, CovidData[]][];
  mouse: {
    x: number;
    y: number;
  };
  y: any;
  x: any;
  width: number;
}

const _CasesGraphInfoBox = ({ dataMapArray, mouse, x, y, width }: Props) => {
  const { covidStore } = useStore();
  const { overlayActive } = covidStore;

  return overlayActive ? (
    <g
      className="case-graph__info-box"
      transform={width < mouse.x + 50 ? `translate(-204, 0)` : ""}
    >
      <rect
        width="200"
        height={70 + (dataMapArray.length - 1) * 20}
        x={mouse.x + 2}
        className="case-graph__info-box__box"
      ></rect>
      <text className="case-graph__info-box__date-text" x={mouse.x + 12} y={27}>
        {format(x.invert(mouse.x), "do MMM yyyy")}
      </text>
      {dataMapArray.map(([key, value], i) => (
        <InfoBoxItem
          key={key}
          color={getColor(i)}
          location={key}
          covid_data={value}
          coords={mouse}
          index={i}
          x={x}
          y={y}
        />
      ))}
    </g>
  ) : (
    <></>
  );
};

interface Props2 {
  color: string;
  location: string;
  covid_data: CovidData[];
  coords: { x: number; y: number };
  index: number;
  y: any;
  x: any;
}
const InfoBoxItem = ({
  color,
  location,
  coords,
  index,
  covid_data,
  x,
  y,
}: Props2) => {
  const bisect = d3.bisector((d: CovidData) => {
    return d.date;
  }).left;
  return (
    <>
      <circle
        cx={coords.x + 15}
        cy={50 + index * 20}
        fill={color}
        className="case-graph__dot--active"
        r="4"
      ></circle>
      <text
        className="case-graph__info-box__location-text"
        x={coords.x + 25}
        y={54 + index * 20}
      >
        {location} :{" "}
      </text>
      <text
        x={200 + coords.x - 5}
        y={54 + index * 20}
        // dominant-baseline="right"
        textAnchor="end"
        className="case-graph__info-box__location-text"
      >
        {new Intl.NumberFormat("en-US").format(
          Math.round(
            covid_data[bisect(covid_data, x.invert(coords.x))].cases_per_million
          )
        )}
      </text>
    </>
  );
};

export const CasesGraphInfoBox = observer(_CasesGraphInfoBox);
