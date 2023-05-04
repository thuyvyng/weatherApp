import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">What Would Cher Wear? </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="https://github.com/thuyvyng/weatherApp">
          Github
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
