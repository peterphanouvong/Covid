import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const res = await axios.get("http://localhost:5000/api/activities");
      setActivities(res.data);
    };

    getActivities();
  }, []);

  return (
    <div className="ui container">
      <Header as="h2" icon>
        <Icon name="users" />
        Activities
      </Header>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
