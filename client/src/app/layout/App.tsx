import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

import { Activity } from "../models/activity";
import { Navbar } from "./Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Loading } from "./Loading";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getActivities = async () => {
      agent.Activities.list().then((res) => {
        setActivities(
          res.map((x) => {
            return {
              ...x,
              date: format(new Date(x.date), "yyyy-MM-dd"),
            };
          })
        );
        setLoading(false);
      });
    };
    getActivities();
  }, []);

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities(
          activities.map((x) => (x.id === activity.id ? activity : x))
        );
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSubmitting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((x) => x.id !== id));
      setSubmitting(false);
    });
  };

  if (loading) return <Loading content="Loading app" />;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          activities={activities}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
