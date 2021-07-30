import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item as={NavLink} to="/colors" name="Colors" />
        <Menu.Item as={NavLink} to="/population" name="Population" />
        <Menu.Item as={NavLink} to="/covid" name="Covid" />
        <Menu.Item as={NavLink} to="/globe" name="Globe" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/create-activity"
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export { Navbar };
