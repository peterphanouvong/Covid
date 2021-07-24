import React from "react";
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}
const ActivityList = ({
  activities,
  handleSelectedActivity,
  handleDeleteActivity,
}: Props) => {
  return (
    <>
      {activities.map((activity) => (
        <Segment key={activity.id} vertical>
          <Item.Group>
            <Item>
              <Item.Content style={{ padding: "0.5rem 0" }}>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <Label basic content={activity.category} />
                    </div>
                    <div>
                      <Button
                        basic
                        onClick={() => handleDeleteActivity(activity.id)}
                        content="Delete"
                      />
                      <Button
                        onClick={() => handleSelectedActivity(activity.id)}
                        content="View"
                      />
                    </div>
                  </div>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      ))}
    </>
  );
};

export { ActivityList };
