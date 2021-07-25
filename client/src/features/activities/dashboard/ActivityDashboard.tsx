import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid, GridColumn, Icon } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";
import { ActivityDetails } from "./ActivityDetails";
import { ActivityForm } from "./ActivityForm";
import { ActivityList } from "./ActivityList";

const Dashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Activity Dashboard</h1>
          <div>
            <Button
              onClick={() => activityStore.openForm()}
              icon
              labelPosition="left"
            >
              <Icon name="add" />
              Create activity
            </Button>
          </div>
        </div>

        <ActivityList />
      </Grid.Column>
      <GridColumn width="6">
        <div style={{ position: "sticky", marginTop: "2rem", top: "6rem" }}>
          {selectedActivity && !editMode && <ActivityDetails />}
          {editMode && <ActivityForm />}
        </div>
      </GridColumn>
    </Grid>
  );
};

export const ActivityDashboard = observer(Dashboard);
