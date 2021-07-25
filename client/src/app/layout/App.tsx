import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";

import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Navbar } from "./Navbar";
import { Loading } from "./Loading";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <Loading content="Loading app" />;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
