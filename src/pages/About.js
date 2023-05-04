import React from "react";
import Navigation from "../components/Navbar";
import { Container, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <>
      <Navigation />

      <Jumbotron style={{ textAlign: "center" }}>
        <Container>
          {" "}
          <h1 className="display-4">about</h1>
          <p className="lead">
            {" "}
            One of my favorite movies of all time is Clueless.
          </p>{" "}
          <p>
            In the opening scene of the movie, Cher has this app to help her
            decide what to wear and I was (and am) envious. So I decided to
            remake my old
            <a href="https://github.com/osu-cs499-w21/assignment-3-thuyvyng">
              {" "}
              assignment
            </a>{" "}
            into a Clueless inspired wardrope/weather app (including the animal
            print background) using OpenWeatherMap. So if you're afraid of being
            a "fashion victim" or "ensemble-y challenged" or just ever struggle
            with the perfect thing to wear for the weather, I hope this app
            helps you out. Here's{" "}
            <a href="https://www.buzzfeed.com/hopelasater/cher-clueless-outfits-ranked">
              a link{" "}
            </a>{" "}
            to the outfits the weather outfits were based on.
          </p>
          <p> Feel free to reach out!</p>
          <a
            href="https://github.com/thuyvyng/weatherApp"
            className="badge badge-info"
          >
            Github
          </a>{" "}
          <a href="https://openweathermap.org/" className="badge badge-info">
            OpenWeatherMap
          </a>{" "}
          <a href="https://thuyvyng.github.io/" className="badge badge-info">
            PersonalWebsite
          </a>
          <a
            href="https://www.linkedin.com/in/thuyvyng/"
            className="badge badge-info"
          >
            Linkedin
          </a>
        </Container>
      </Jumbotron>
    </>
  );
}
