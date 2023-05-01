/**@jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import { css } from "@emotion/react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Jumbotron,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navbar";

var OW = "7caac9e6166772127226ad6470b80a57";

function WeatherCard(props) {
  const d = new Date(props.dt);
  const low = css`
    color: blue;
  `;

  const high = css`
    color: red;
  `;

  const row = css`
    text-align: center;
  `;

  const styles = css`
    :root {
      --skin: #f8d9c1;
      --border: #483b55;
      --tshirt1: teal;
      --tshirt2: tomato;
      --shadow: #483b5555;
      --bg: wheat;
    }

    *,
    *:after,
    *:before {
      box-sizing: border-box;
    }
    *:after,
    *:before {
      content: "";
    }
    .me *,
    .me *:after,
    .me *:before {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    }

    .body {
      background: #f8d9c1;
    }

    .illustration {
      min-height: 790px;
      z-index: 1;
      margin: auto;
    }

    .head {
      border-bottom: none;
      background-position: top left;
      top: 14vh;
      height: 14vh;
      width: 11vh;
      border-radius: 50% 40% 0 0;
      z-index: 2;
      transform-origin: center bottom;
    }
    .hair {
      border-radius: 50% 50% 0 0 / 60% 60% 0 0;
      background: #faf0be;
      width: 100%;
      height: 100%;
      top: 10%;
      z-index: 1;
    }

    .face {
      top: 9vh;
      width: 7vh;
      height: 4.25vh;
      border-radius: 0 0 6vh 6vh / 0 0 7.5vh 7.5vh;
      border-top: none;
      z-index: 2;
      overflow: hidden;
      &:before,
      &:after {
        background: tomato;
        width: 2vh;
        height: 2vh;
        border-radius: 50%;
        left: 0;
        right: auto;
        top: 1vh;
        opacity: 0;
      }
      &:after {
        right: 0;
        left: auto;
      }
    }

    .face-up {
      background: #f8d9c1;
      height: 2vh;
      width: 7vh;
      top: 7.25vh;
      clip-path: polygon(60% 0, 100% 100%, 0 100%);
      z-index: 1;
    }

    .nose {
      top: 1vh;
      width: 15%;
      height: 1vh;
      border-radius: 0 0 0.75vh 0.75vh;
      border: 0.25vh solid #483b5555;
      border-top-color: #f8d9c1;
    }
    .lips {
      border-bottom: 2px solid;
      border-radius: 0 0 100% 100% / 0 0 100% 100%;
      width: 2vh;
      height: 1vh;
      top: 2vh;
    }
    .eyes {
      top: 0.5vh;
      height: 2vh;
    }
    .eyes:before,
    .eyes:after {
      border: 2px solid;
      border-top: none;
      width: 1.75vh;
      height: 0.5vh;
    }
    .eyes:before {
      right: auto;
      border-radius: 100% 0%;
      left: calc(50% + 1.125vh);
      border-left: none;
    }
    .eyes:after {
      left: auto;
      border-radius: 0% 100% 0% 100%;
      right: calc(50% + 1.125vh);
      border-right: none;
    }
    .neck {
      box-shadow: inset 0 1vh 0.3vh #483b5555;
      height: 3.5vh;
      width: 2.4vh;
      top: 12.5vh;
      border-bottom-color: #f8d9c1;
      z-index: 1;
    }

    .decoltee {
      border: 0.5vh solid white;
      border-top: 0;
      z-index: 10;
      height: 8%;
      width: 27%;
      top: 15.5vh;
      border-radius: 0 0 50% 50% / 0 0 100% 100%;
    }
    .dress {
      background: red;
      clip-path: polygon(30% 0%, 70% 0, 100% 100%, 0 100%);
      background-position: bottom center;
      background-size: 100% 2vh;
      height: 22vh;
      width: 11vh;
      top: 29.5vh;
      z-index: 1;
      transform-origin: center top;
    }
    .trapeze {
      height: 30vh;
    }

    .arm {
      width: 14vh;
      height: 2vh;
      bottom: -2vh;
      left: auto;
      right: auto;
      border-radius: 2vh;
    }
    .arm-l {
      transform-origin: right top;
      right: calc(50% + 2vh);
      transform: rotate(-60deg);
    }
    .arm-r {
      transform-origin: left top;
      left: calc(50% + 2vh);
      transform: rotate(60deg);
    }
    .me {
      z-index: 0;
    }
    .leg {
      height: 5vh;
      width: 2.25vh;
      top: 50vh;
      border-radius: 2vh;
      &:after {
        z-index: -1;
        content: "";
        height: 20vh;
        width: 2.25vh;
        background: inherit;
        border-radius: 2vh;
        top: calc(100% - 2vh);
        background-image: linear-gradient(
          to bottom,
          transparent 20%,
          white 20%,
          white 15%,
          tomato 25%,
          tomato 27%,
          white 27%,
          white 60%,
          teal 60%,
          teal
        );
      }
    }
    .leg-l {
      transform-origin: center top;
      transform: rotate(5deg);
      left: -4vh;
    }

    .leg-r {
      transform-origin: center 1vh;
      left: 4vh;
      transform: rotate(-5deg);
    }
  `;

  var snowMessage = props.snow
    ? "Woah snow? Better get some mittens for some snow angels."
    : "";
  var rainMessage =
    "It's likely that it's going to rain, might wanna bring an umbrella or jacket.";

  var temperatureMessage = "";
  if (props.feels_like < 32) {
    temperatureMessage =
      "Ooh! It's freezing out here -- make sure to bundle up. Wear a cozy jacket, keep some gloves on hand, throw on some boots, and maybe add a cute beanie or scarf for a nice touch. ";
  } else if (props.feels_like < 55) {
    temperatureMessage =
      "Pretty cold out here, so light layers will be your best friend. Put on some cute jeans, a long sleeve, and a cute jacket to top it off. ";
  } else if (props.feels_like < 70) {
    temperatureMessage =
      "Not bad weather. Cute light sweater would be nice. Maybe pair it with a nice pair of pants or with a skirt and add some tights for extra warmth";
  } else if (props.feels_like < 83) {
    temperatureMessage =
      "Nice weather. Maybe wear a nice dress or just comfy pants and a cute shirt.";
  } else if (props.feels_like < 93) {
    temperatureMessage =
      "It's really hot out here.Would be good weather for a pair of cute shorts and a nice shirt. ";
  } else {
    temperatureMessage =
      "It's crazy hot out here, stay hydrated. Keep some water on hand. If you can make it to water grab a swimsuit and go swimming, if you're not as lucky a cute sundress will help you out. ";
  }

  return (
    <Card style={{ backgroundColor: "#ffdde2" }}>
      <Row>
        <Col>
          <Container>
            <Card.Body>
              <Card.Title class="display-4">{d.toDateString()}</Card.Title>
              <Card.Text class="lead">
                <img
                  src={`http://openweathermap.org/img/wn/${props.pic}@2x.png`}
                />
                {props.des}, feels like {props.feels_like} °F
              </Card.Text>
              <Row>
                <Col> Current temp:</Col>
                <Col> {props.temp_min} °F</Col>
                <Col css={high}> </Col>
              </Row>
              <Row>
                <Col> Lows & Highs:</Col>
                <Col css={low}> {props.temp_min} °F</Col>
                <Col css={high}> {props.temp_max} °F</Col>
              </Row>
              <Row>
                <Col> Precipitation:</Col>
                <Col>{props.pop * 100}% </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col> Humidity:</Col>
                <Col>{props.humidity}% </Col>
                <Col></Col>
              </Row>

              <br></br>
              <Row>
                <Col>
                  <p class="lead"> What would Cher wear?</p>
                  {temperatureMessage}
                  {snowMessage}
                  {props.pop > 0.5 && <Card.Text>{rainMessage}</Card.Text>}
                </Col>
              </Row>
            </Card.Body>
          </Container>
        </Col>
        <Col>
          <div css={styles}>
            <div class="illustration">
              <div class="me">
                <div class="head">
                  <div class="hair"></div>
                  <div class="face-up"></div>
                  <div class="face body">
                    <div class="eyes"></div>
                    <div class="nose"></div>
                    <div class="lips"></div>
                  </div>
                  <div class="neck body"></div>
                  <div class="decoltee"></div>
                </div>
                <div class="dress"></div>
                <div class="trapeze">
                  <div class="arm arm-l body"></div>
                  <div class="arm arm-r body"></div>
                </div>
                <div class="leg leg-l body"></div>
                <div class="leg leg-r body"></div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function Search({ query }) {
  const [inputQuery, setInputQuery] = useState(query || "");
  const [city, setCity] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      try {
        console.log(JSON.stringify(query));
        const res = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${OW}`,
          { signal: controller.signal }
        );
        responseBody = await res.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP Request Aborted");
        }
      }

      let responseBody2 = {};
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${responseBody[0].lat}&lon=${responseBody[0].lon}&appid=${OW}&units=imperial`,
          { signal: controller.signal }
        );
        responseBody2 = await res.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP Request Aborted");
        }
      }

      if (!ignore) {
        setCity(responseBody2.list || []);
        console.log(responseBody2.list[0]);
      }
    }

    if (query) {
      fetchSearchResults();
    }

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [query]);

  return (
    <div>
      <Navigation />
      <Container>
        <br></br>
        <Row>
          <Col>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                history.push(`?q=${inputQuery}`);
              }}
            >
              <Form.Control
                className="me-2"
                type="text"
                placeholder="Enter City Here: Seattle,WA,US"
                aria-label="Search"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
              />

              <Button type="submit">Search</Button>
            </Form>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col>
            {city.slice(0, 1).map((city) => {
              return (
                <WeatherCard
                  temp={city.main.temp}
                  temp_min={city.main.temp_min}
                  temp_max={city.main.temp_max}
                  feels_like={city.main.feels_like}
                  humidity={city.main.humidity}
                  dt={city.dt_txt}
                  pop={city.pop}
                  main={city.weather[0].main}
                  des={city.weather[0].description}
                  pic={city.weather[0].icon}
                  snow={city.snow}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Search;
