import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import axios from "axios";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(150);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch Banner Data
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const url = "https://raw.githubusercontent.com/Rathoreatri03/testing/main/BannerDetails.json";
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data from GitHub", err);
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  // Typing Effect Logic
  useEffect(() => {
    if (!data.titles || data.titles.length === 0) return;
    const ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
  }, [text, delta, data.titles]);

  const tick = () => {
    if (!data.titles || data.titles.length === 0) return;
    const i = loopNum % data.titles.length;
    const fullText = data.titles[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    setDelta(isDeleting ? 100 : 150);
  };

  // Firefly Effect
  useEffect(() => {
    const fireflyField = document.querySelector(".firefly-field");
    if (!fireflyField || fireflyField.children.length > 0) return;

    for (let i = 0; i < 50; i++) {
      const firefly = document.createElement("div");
      firefly.className = "firefly";
      firefly.style.left = `${Math.random() * 120 - 10}%`; // Fireflies move outside the window
      firefly.style.top = `${Math.random() * 120 - 10}%`;
      firefly.style.animationDelay = `${Math.random() * 5}s`; // Random blinking delay
      firefly.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random movement speed
      fireflyField.appendChild(firefly);
    }
  }, []);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Let's Innovate Tomorrow</span>
                  <h1 className="display-4">Hi! I'm Ruchi Tiwari</h1>
                  <div className="typing-effect">
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>
                  </div>
                  <p className="lead">{loading ? "Loading..." : data.description}</p>
                  <button
                    className="btn btn-outline-light btn-lg"
                    onClick={() => window.open('https://www.linkedin.com/in/ruchitiwari03/', '_blank')}
                  >
                    Let’s Connect <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={data.imgUrl} alt="Header Img" className="img-fluid" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <div className="firefly-field"></div>
    </section>
  );
};
