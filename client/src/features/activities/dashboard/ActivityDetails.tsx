import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Button } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";

const _ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    cancelSelectedActivity,
    openForm,
  } = activityStore;

  if (!activity) return <></>;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button basic onClick={cancelSelectedActivity}>
            Cancel
          </Button>
          <Button onClick={() => openForm(activity.id)}>Edit</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export const ActivityDetails = observer(_ActivityDetails);
