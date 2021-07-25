import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Item, Segment, Button, Label } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";

const _ActivityList = () => {
  const { activityStore } = useStore();
  const {
    loading: submitting,
    deleteActivity,
    selectActivity,
    activitiesByDate,
  } = activityStore;
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <>
      {activitiesByDate.map((activity) => (
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
                        name={activity.id}
                        basic
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        content="Delete"
                        loading={submitting && target === activity.id}
                      />
                      <Button
                        onClick={() => selectActivity(activity.id)}
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

export const ActivityList = observer(_ActivityList);
