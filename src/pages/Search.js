/**@jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import { css } from "@emotion/react";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
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

  var weatherMessage = "";
  var weatherBackground = "";

  if (props.snow) {
    weatherMessage = "Woah snow? Better get some mittens for some snow angels.";
    weatherBackground =
      "https://static.vecteezy.com/system/resources/previews/000/210/590/original/vector-christmas-snow-background.jpg";
  } else if (props.pop > 0.4) {
    weatherMessage =
      "It's likely that it's going to rain, might wanna bring an umbrella or jacket.";
    weatherBackground =
      "https://static.vecteezy.com/system/resources/previews/009/639/565/original/stock-illustration-seamless-pattern-watercolor-drawing-raindrops-on-a-white-background-isolated-rain-of-blue-violet-turquoise-cute-watercolor-background-for-baby-wallpaper-textile-wrappers-vector.jpg";
  } else {
    weatherBackground =
      "https://www.nikkisplate.com/wp-content/uploads/2022/08/Screen-Shot-2021-06-26-at-4.26.18-PM.png";
  }

  var temperatureMessage = "";
  var sleeveLength = 0;
  var topColor = "red";
  var sleeveColor = "red";
  var dressLength = 22;
  var bottomsColor = "#f8d9c1";
  var shoeColor = "white";
  var which = Math.floor(Math.random() * 2);

  if (props.feels_like < 40) {
    //purple combo or pink sweater over white
    temperatureMessage =
      "Ooh! It's freezing out here -- make sure to bundle up. Wear a cozy jacket, keep some gloves on hand, throw on some boots, and maybe add a cute beanie or scarf for a nice touch. ";
    sleeveLength = 20;
    if (which === 1) {
      topColor = "#bd7dbd"; //"white";
      sleeveColor = "#ad5cad"; //"pink";
      shoeColor = "purple";
    } else {
      topColor = "white";
      sleeveColor = "pink"; //"pink";
      shoeColor = "pink";
    }

    dressLength = 15;
    bottomsColor = "#6F8FAF";
  } else if (props.feels_like < 55) {
    //goth outfit
    temperatureMessage =
      "Pretty cold out here, so light layers will be your best friend. Put on some cute jeans, a long sleeve, and a cute jacket to top it off. ";
    sleeveColor = "#303336";
    bottomsColor = "black";
    topColor = "#d2d4d2";
    sleeveLength = 20;
    dressLength = 15;
    shoeColor = "grey";
  } else if (props.feels_like < 70) {
    //purple pants and white shirt
    temperatureMessage =
      "Not bad weather. Cute light shirt would be nice. Maybe pair it with a nice pair of fun pants or with a skirt and add some tights for extra warmth";
    sleeveLength = 60;
    topColor = "#FAF9F6";
    sleeveColor = "#FAF9F6";
    bottomsColor = "#ca97ca";
    shoeColor = "#bd7dbd";
    dressLength = 14;
  } else if (props.feels_like < 88) {
    temperatureMessage =
      "Nice weather. Maybe wear a nice dress or just cute skirt and a cute shirt.";
    topColor = "#E1EEDD";
    sleeveColor = "#E1EEDD";
    sleeveLength = 60;
    dressLength = 22;
    if (which === 1) {
      topColor = "#E1EEDD";
      sleeveColor = "#E1EEDD";
      shoeColor = "#e6ffe6";
    } else {
      sleeveColor = "#9DC08B";
      topColor = "#9DC08B";
      shoeColor = "black";
    }
  } else {
    //Alaia Dress or Calvin Klein
    temperatureMessage =
      "It's crazy hot out here, stay hydrated. Keep some water on hand. If you can make it to water grab a bikini and go to the pool, if you're not as lucky a cute dress will help you out. My favorites are my Alaia or Calvin Klein dresses. ";
    sleeveLength = 100;
    if (which === 1) {
      topColor = "red";
      shoeColor = "red";
    } else {
      topColor = "white";
      shoeColor = "pink";
    }
    sleeveColor = "red";
    dressLength = 22;
  }

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
      border: 0.7vh solid #f8d9c1;
      border-top: 0;
      z-index: 10;
      height: 8%;
      width: 27%;
      top: 15.5vh;
      border-radius: 0 0 50% 50% / 0 0 100% 100%;
    }
    .dress {
      background: ${topColor};
      clip-path: polygon(35% 0%, 65% 0, 100% 100%, 0 100%);
      background-position: bottom center;
      background-size: 100% 2vh;
      height: ${dressLength}vh;
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
      background-image: linear-gradient(
        to right,
        transparent ${sleeveLength}%,
        ${sleeveColor} ${sleeveLength}%,
        ${sleeveColor}
      );
    }
    .arm-r {
      background-image: linear-gradient(
        to left,
        transparent ${sleeveLength}%,
        ${sleeveColor} ${sleeveLength}%,
        ${sleeveColor}
      );
      transform-origin: left top;
      left: calc(50% + 2vh);
      transform: rotate(60deg);
    }
    .me {
      z-index: 0;
    }
    .leg {
      height: 10vh;
      width: 2.25vh;
      top: 43vh;
      border-radius: 2vh;
      background: ${bottomsColor};
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
          transparent 70%,
          ${shoeColor} 70%,
          ${shoeColor}
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
  return (
    <Card className="border-secondary">
      <Row>
        <Col>
          <Container>
            <Card.Body>
              <Card.Title className="display-4">{d.toDateString()}</Card.Title>
              <Card.Text className="lead">
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
                  <p className="lead"> What would Cher wear?</p>
                  {temperatureMessage}
                  {<Card.Text>{weatherMessage}</Card.Text>}
                </Col>
              </Row>
            </Card.Body>
          </Container>
        </Col>
        <Col
          style={{
            backgroundImage: `url(${weatherBackground})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div css={styles}>
            <div className="illustration">
              <div className="me">
                <div className="head">
                  <div className="hair"></div>
                  <div className="face-up"></div>
                  <div className="face body">
                    <div className="eyes"></div>
                    <div className="nose"></div>
                    <div className="lips"></div>
                  </div>
                  <div className="neck body"></div>
                  <div className="decoltee"></div>
                </div>
                <div className="dress"></div>
                <div className="trapeze">
                  <div className="arm arm-l body"></div>
                  <div className="arm arm-r body"></div>
                </div>
                <div className="leg leg-l body"></div>
                <div className="leg leg-r body"></div>
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
