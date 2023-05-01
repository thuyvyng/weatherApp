import React from "react";
import Navigation from "../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Error() {
  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <h1> Error</h1>
            <h2> Page does not exist</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}
