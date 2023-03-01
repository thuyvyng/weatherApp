import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">What Would Cher Wear? </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="https://github.com/osu-cs499-w21/assignment-3-thuyvyng">
          Github
        </Nav.Link>
        <Nav.Link href="https://openweathermap.org/">
          OpenWeatherMap API
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
