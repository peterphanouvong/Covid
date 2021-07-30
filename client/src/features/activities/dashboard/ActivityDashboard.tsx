import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid, GridColumn } from "semantic-ui-react";

import { Loading } from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";

import { ActivityList } from "./ActivityList";
import { ActivityFilters } from "./ActivityFilters";

const Dashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, loadingInitial } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry]);

  if (loadingInitial) return <Loading content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <h1>Activity Dashboard</h1>
        <ActivityList />
      </Grid.Column>
      <GridColumn width="6">
        <ActivityFilters />
      </GridColumn>
    </Grid>
  );
};

export const ActivityDashboard = observer(Dashboard);
