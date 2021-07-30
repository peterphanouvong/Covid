import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Item, Segment, Button, SegmentGroup, Icon } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();
  const { loading: submitting, deleteActivity } = activityStore;
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };
  return (
    <SegmentGroup>
      <Segment key={activity.id}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as="h3">{activity.title}</Item.Header>
              <Item.Meta>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Hosted by Bob
                </div>
              </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary attached>
        <Item>Attendees go here</Item>
      </Segment>
      <Segment attached="bottom">
        <Item.Group>
          <Item>
            <Item.Content>
              <Icon name="calendar" circular /> {activity.date}
              <span style={{ padding: "0.5rem" }}></span>
              <Icon name="marker" circular /> {activity.city}, {activity.venue}
              <Button
                as={Link}
                to={`/activities/${activity.id}`}
                content="View"
                floated="right"
              />
              <Button
                name={activity.id}
                basic
                onClick={(e) => handleActivityDelete(e, activity.id)}
                content="Delete"
                loading={submitting && target === activity.id}
                floated="right"
              />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </SegmentGroup>
  );
};

export { ActivityListItem };
