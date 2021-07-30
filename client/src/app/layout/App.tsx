import React from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";

import { Navbar } from "./Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { HomePage } from "../../features/activities/home/HomePage";
import { ActivityForm } from "../../features/activities/dashboard/ActivityForm";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";
import { ColorDashboard } from "../../features/colors/ColorDashboard";
import { PopulationDashboard } from "../../features/population/PopulationDashboard";
import { CovidDashboard } from "../../features/covid/CovidDashboard";
import { GlobeDashboard } from "../../features/globe/GlobeDashboard";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7rem" }}>
              <Route exact path="/colors" component={ColorDashboard} />
              <Route exact path="/globe" component={GlobeDashboard} />
              <Route exact path="/covid" component={CovidDashboard} />
              <Route exact path="/population" component={PopulationDashboard} />
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route exact path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/create-activity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
