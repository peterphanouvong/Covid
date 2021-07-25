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
