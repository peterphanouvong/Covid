import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Activity } from "../models/activity";
import { Navbar } from "./Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      axios
        .get<Activity[]>("http://localhost:5000/api/activities")
        .then((res) => {
          setActivities(res.data);
        });
    };

    getActivities();
  }, []);

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities(
          activities.map((x) => (x.id === activity.id ? activity : x))
        )
      : setActivities([...activities, { ...activity, id: uuid() }]);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((x) => x.id !== id));
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          activities={activities}
        />
      </Container>
    </>
  );
}

export default App;
