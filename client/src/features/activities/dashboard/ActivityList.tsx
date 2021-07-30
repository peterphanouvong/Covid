import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { format } from "date-fns";

import { useStore } from "../../../app/stores/store";
import { ActivityListItem } from "./ActivityListItem";

const _ActivityList = () => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header as="h4">
            {format(new Date(group), "EEEE, do MMMM yyyy")}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export const ActivityList = observer(_ActivityList);
