import React, { useEffect } from "react";
import * as d3 from "d3";
// @ts-ignore
import { drag } from "../../app/utils/drag";
import * as topojson from "topojson-client";

const Globe = () => {
  useEffect(() => {
    const draw = async () => {
      const land110 = await d3
        .json("https://unpkg.com/world-atlas@1/world/110m.json")
        .then((world) => {
          //@ts-ignore
          return topojson.feature(world, world.objects.land);
        });
      const sphere = { type: "Sphere" };

      const canvas = d3.select("canvas");
      const width = canvas.property("width");
      const height = canvas.property("height");
      // @ts-ignore
      const context = canvas.node().getContext("2d");

      const projection = d3
        .geoOrthographic()
        .scale((height - 10) / 2)
        .translate([width / 2, height / 2])
        .precision(0.1);

      const path = d3.geoPath(projection, context);

      // @ts-ignore
      function render(land) {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        // @ts-ignore
        path(sphere);
        context.fillStyle = "#fff";
        context.fill();
        context.beginPath();
        path(land);
        context.fillStyle = "#000";
        context.fill();
        context.beginPath();
        // @ts-ignore
        path(sphere);
        context.stroke();
      }

      canvas
        .call(
          // @ts-ignore
          drag(projection)
            .on("drag.render", () => render(land110))
            .on("end.render", () => render(land110))
        )
        .call(() => render(land110))
        .node();
    };

    draw();
  }, []);

  return (
    <div>
      <h1>Globe</h1>
      <canvas id="globe" width="960" height="600"></canvas>
    </div>
  );
};

export { Globe };
