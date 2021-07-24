import React, { useState } from "react";
import { Button, Grid, GridColumn, Icon } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ActivityDetails } from "./ActivityDetails";
import { ActivityForm } from "./ActivityForm";
import { ActivityList } from "./ActivityList";

interface Props {
  activities: Activity[];
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
}

const ActivityDashboard = ({
  activities,
  handleCreateOrEditActivity,
  handleDeleteActivity,
}: Props) => {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();

  const [editMode, setEditMode] = useState(false);

  const handleFormOpen = (id?: string) => {
    id ? handleSelectedActivity(id) : handleCancelActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleSubmitActivityForm = (activity: Activity) => {
    handleCreateOrEditActivity(activity);
    setEditMode(false);
    setSelectedActivity(activity);
  };

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
            <Button onClick={() => handleFormOpen()} icon labelPosition="left">
              <Icon name="add" />
              Create activity
            </Button>
          </div>
        </div>

        <ActivityList
          activities={activities}
          handleDeleteActivity={handleDeleteActivity}
          handleSelectedActivity={handleSelectedActivity}
        />
      </Grid.Column>
      <GridColumn width="6">
        <div style={{ position: "sticky", marginTop: "2rem", top: "6rem" }}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              activity={selectedActivity}
              handleCancelActivity={handleCancelActivity}
              handleFormOpen={handleFormOpen}
            />
          )}
          {editMode && (
            <ActivityForm
              handleSubmitActivityForm={handleSubmitActivityForm}
              handleFormClose={handleFormClose}
              activity={selectedActivity}
            />
          )}
        </div>
      </GridColumn>
    </Grid>
  );
};

export { ActivityDashboard };
