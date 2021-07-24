import React from "react";
import { Menu, Container } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item header>Hello</Menu.Item>
        <Menu.Item name="Activities" />
      </Container>
    </Menu>
  );
};

export { Navbar };
