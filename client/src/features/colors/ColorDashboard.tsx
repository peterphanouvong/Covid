import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { Table } from "semantic-ui-react";
import { csvFormat } from "d3";
import { Loading } from "../../app/layout/Loading";
import { ColorPie } from "./ColorPie";

const ColorDashboard = () => {
  const [colorData, setColorData] = useState<d3.DSVRowArray<string>>();

  useEffect(() => {
    d3.csv(
      "https://gist.githubusercontent.com/peterphanouvong/3e02501549ee33fe0f59bf8c38ae9e32/raw/Colors.csv"
    ).then(setColorData);
  }, []);

  console.log(colorData);

  if (!colorData) return <Loading content="Loading Data" />;
  return (
    <>
      <h1>This is the Color Dashboard</h1>
      <Table celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Size</Table.Cell>
            <Table.Cell>
              {Math.round(csvFormat(colorData).length / 1024)}kB
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rows</Table.Cell>
            <Table.Cell>{colorData.length}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Columns</Table.Cell>
            <Table.Cell>{colorData.columns.length}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <ColorPie
        width={400}
        height={400}
        top={10}
        right={10}
        bottom={10}
        left={10}
      />
    </>
  );
};

export { ColorDashboard };
