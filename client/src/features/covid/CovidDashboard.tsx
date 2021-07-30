import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Loading } from "../../app/layout/Loading";
import { useStore } from "../../app/stores/store";
import { Grid } from "semantic-ui-react";
import { CasesGraphFilters } from "./CasesGraphFilters";
import { CasesGraph } from "./CasesGraph";

const _CovidDashboard = () => {
  const { vaccinationStore, covidStore } = useStore();
  const { loadVaccinationPercentages, loadingInitial } = vaccinationStore;
  const { loadCovidData } = covidStore;

  useEffect(() => {
    loadVaccinationPercentages();
    loadCovidData();
  }, [loadVaccinationPercentages, loadCovidData]);

  // console.log(vaccinationsGroupedByLocation);

  if (loadingInitial) return <Loading content="Loading data" />;
  return (
    <Grid>
      <Grid.Column width="12">
        <h1>Covid Dashboard</h1>
        <div style={{ marginTop: "4rem" }}></div>
        <CasesGraph
          top={10}
          right={150}
          bottom={50}
          left={45}
          width={800}
          height={400}
          fill="tomato"
        />
      </Grid.Column>
      <Grid.Column width="4">
        <CasesGraphFilters />
      </Grid.Column>
    </Grid>
  );
};

export const CovidDashboard = observer(_CovidDashboard);
