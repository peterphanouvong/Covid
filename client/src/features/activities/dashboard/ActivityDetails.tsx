import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  handleCancelActivity: () => void;
  handleFormOpen: (id?: string) => void;
}
const ActivityDetails = ({
  activity,
  handleCancelActivity,
  handleFormOpen,
}: Props) => {
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
          <Button basic onClick={handleCancelActivity}>
            Cancel
          </Button>
          <Button onClick={() => handleFormOpen(activity.id)}>Edit</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export { ActivityDetails };
