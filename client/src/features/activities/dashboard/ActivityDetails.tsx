import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Card, Button } from "semantic-ui-react";
import { useParams } from "react-router";

import { useStore } from "../../../app/stores/store";
import { Loading } from "../../../app/layout/Loading";
import { Link } from "react-router-dom";

const _ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [loadActivity, id]);

  if (loadingInitial || !activity) return <Loading content="loading" />;

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
          <Button as={Link} to={`/activities`} basic>
            Cancel
          </Button>
          <Button as={Link} to={`/manage/${activity.id}`}>
            Edit
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export const ActivityDetails = observer(_ActivityDetails);
