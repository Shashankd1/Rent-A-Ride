import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { NavigationBar } from "./NavigationBar";

function AboutUs() {
  return (
    <>
    <NavigationBar/>
      <section className="about-page bg-dark text-white">
        <Container>
          <Row>
            <Col md={12}>
              <div className="about-main__text">
                <h3 className="text-center">
                  About Our Car Rental Service - Your Adventure Awaits with Us
                </h3>

                <br />
                <p>
                  Welcome to Car-Rental Website , your gateway to a world of
                  seamless travel experiences. At Car-Rental Website, we
                  understand the significance of every journey, and our mission
                  is to elevate your travel adventures through top-notch car
                  rental services.
                </p>
                <h3>Our Goals</h3>
                <ul>
                  <li>
                    <strong>Commitment:</strong> Elevating your travel
                    adventures through top-notch car rental services.
                  </li>
                  <li>
                    <strong>Unmatched Fleet:</strong> Explore our diverse range
                    of vehicles, carefully curated to meet your preferences.
                  </li>
                  <li>
                    <strong>Locations Nationwide:</strong> Convenient rental
                    locations spanning the nation for easy access.
                  </li>
                  <li>
                    <strong>Customer-Centric:</strong> 24/7 customer support,
                    prioritizing your comfort, and safety.
                  </li>
                  <li>
                    <strong>Embark on Your Journey:</strong> Join us for a
                    hassle-free and memorable travel experience.
                  </li>
                </ul>
                <div className="about-main__text__icons">
                  <div className="about-main__text__icons__box">
                    <span>
                      <h4>10+</h4>
                      <p>Car Models</p>
                    </span>
                  </div>
                  <div className="about-main__text__icons__box">
                    <span>
                      <h4>100+</h4>
                      <p>Rental Locations</p>
                    </span>
                  </div>
                  <div className="about-main__text__icons__box">
                    <span>
                      <h4>24/7</h4>
                      <p>Customer Support</p>
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="book-banner bg-dark text-white">
        <div className="book-banner__overlay"></div>
        <Container>
          <Row>
            <Col>
              <div className="text-content text-center">
                <h2>Embark on Your Journey Today</h2>
                <p>
                  For reservations, inquiries, or assistance, feel free to
                  contact us at:
                </p>
                <span className="contact-info">
                  <i className="fa-solid fa-phone"></i>
                  <h3>93700-49516</h3>
                </span>
                <p>Email: carrental@gmail.com</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
