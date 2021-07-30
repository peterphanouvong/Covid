import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const ActivityFilters = () => {
  return (
    <>
      <Menu
        vertical
        size="large"
        style={{ width: "100%", marginTop: "6.8rem" }}
      >
        <Header icon="filter" attached content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
};

export { ActivityFilters };
