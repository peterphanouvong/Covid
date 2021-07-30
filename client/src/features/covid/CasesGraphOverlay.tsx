import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./CasesGraph.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  width: number;
  height: number;
  mouse: {
    x: number;
    y: number;
  };
  setMouse: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}
const _CasesGraphOverlay = ({ width, height, mouse, setMouse }: Props) => {
  const { covidStore } = useStore();
  const { setOverlay, overlayActive } = covidStore;

  const overlayRef = useRef(null);

  const handleMouseOver = () => {
    setOverlay(true);
  };

  const handleMouseOut = () => {
    setOverlay(false);
  };

  useEffect(() => {
    d3.select(overlayRef.current).on("mousemove", (e) => {
      setMouse({
        x: d3.pointer(e)[0],
        y: d3.pointer(e)[1],
      });
    });
  }, [setMouse]);

  return (
    <>
      <path
        className={`case-graph__slider ${
          overlayActive && "case-graph__slider--active"
        }`}
        d={`M ${mouse.x},${0} ${mouse.x},${height}`}
      />
      <rect
        ref={overlayRef}
        className="case-graph__cover"
        width={width}
        height={height}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      ></rect>
    </>
  );
};

export const CasesGraphOverlay = observer(_CasesGraphOverlay);
