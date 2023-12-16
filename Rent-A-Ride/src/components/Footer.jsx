// Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container className="d-flex justify-content-between">
        <div>
          <p>&copy; 2023 Car Rental Company</p>
        </div>
        <nav>
          <ul className="list-unstyled d-flex">
            <li className="me-3">Privacy Policy</li>
            <li className="me-3">Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
