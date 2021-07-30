import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, Message, Statistic } from "semantic-ui-react";
import { Loading } from "../../app/layout/Loading";
import { useStore } from "../../app/stores/store";
import { PopulationBarChart } from "./PopulationBarChart";
import { PopulationBarChatFilters } from "./PopulationBarChatFilters";

const _PopulationDashboard = () => {
  const { populationStore } = useStore();
  const {
    loadCountryPopulations,
    countryPopulations,
    selectedCountryPopulations,
    selectedCountryPopulation,
  } = populationStore;
  useEffect(() => {
    loadCountryPopulations();
  }, [loadCountryPopulations]);

  if (!countryPopulations || !selectedCountryPopulations)
    return <Loading content="Loading data" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <div>
          <h1>Population Bar Chart</h1>
          <div style={{ marginTop: "4rem" }}></div>
          <PopulationBarChart
            top={10}
            right={50}
            bottom={50}
            left={65}
            width={700}
            height={400}
            fill="tomato"
          />
        </div>

        {selectedCountryPopulation ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Statistic>
              <Statistic.Label>
                {selectedCountryPopulation?.country}
              </Statistic.Label>
              <Statistic.Value>
                {new Intl.NumberFormat("en-US").format(
                  selectedCountryPopulation?.population
                )}
              </Statistic.Value>
            </Statistic>
          </div>
        ) : (
          <Message info>
            <Message.Header>
              Click on a country to see some stats.
            </Message.Header>
          </Message>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <PopulationBarChatFilters />
      </Grid.Column>
    </Grid>
  );
};

export const PopulationDashboard = observer(_PopulationDashboard);
