import { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsInstagram,
  BsFacebook,
  BsTwitterX,
  BsDiscord,
  BsGithub,
  BsSend,
  BsTruck,
  BsHeadset,
} from "react-icons/bs";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="custom-footer pt-5">
      <Container>
        <Row className="g-4 mb-5">
          <Col lg={4} md={6}>
            <Link to="/" className="d-inline-block mb-3">
              <img
                src="/logo.png"
                alt="Logo Tech Store"
                className="footer-brand-logo"
              />
            </Link>
            <p className="text-white-50 mb-4 pe-lg-3">
              Il tuo punto di riferimento per hardware di fascia alta, PC
              assemblati e accessori da gaming. Prestazioni estreme e supporto
              tecnico dedicato.
            </p>

            <div className="d-flex align-items-center gap-2">
              <a
                href="#instagram"
                className="social-icon-btn"
                title="Instagram"
              >
                <BsInstagram size={16} />
              </a>
              <a href="#facebook" className="social-icon-btn" title="Facebook">
                <BsFacebook size={16} />
              </a>
              <a
                href="#twitter"
                className="social-icon-btn"
                title="Twitter / X"
              >
                <BsTwitterX size={16} />
              </a>
              <a href="#discord" className="social-icon-btn" title="Discord">
                <BsDiscord size={16} />
              </a>
              <a href="#github" className="social-icon-btn" title="GitHub">
                <BsGithub size={16} />
              </a>
            </div>
          </Col>
          <Col lg={2} md={6} sm={6}>
            <h5 className="footer-title mb-3">Shop & Strumenti</h5>
            <ul className="footer-links">
              <li>
                <Link to="/configuratore" className="footer-link">
                  PC Builder
                </Link>
              </li>
              <li>
                <Link to="/comparatore" className="footer-link">
                  Comparatore
                </Link>
              </li>
              <li>
                <Link to="/#shop/macbook" className="footer-link">
                  MacBook
                </Link>
              </li>
              <li>
                <Link to="/#shop/pcdesktop" className="footer-link">
                  PC Desktop
                </Link>
              </li>
              <li>
                <Link to="/#shop/accessori" className="footer-link">
                  Accessori Gaming
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} sm={6}>
            <h5 className="footer-title mb-3">Supporto</h5>
            <ul className="footer-links">
              <li>
                <a href="#faq" className="footer-link">
                  Domande Frequenti (FAQ)
                </a>
              </li>
              <li>
                <a href="#spedizioni" className="footer-link">
                  Spedizioni e Consegne
                </a>
              </li>
              <li>
                <a href="#resi" className="footer-link">
                  Resi e Rimborsi
                </a>
              </li>
              <li>
                <a href="#garanzia" className="footer-link">
                  Garanzia Hardware 24 Mesi
                </a>
              </li>
              <li>
                <a href="#contatti" className="footer-link">
                  Contatta l'Assistenza
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="footer-title mb-3">Rimani Aggiornato</h5>
            <p className="text-white-50 small mb-3">
              Iscriviti per ricevere offerte esclusive, codici sconto e
              anteprime sulle ultime novità tech.
            </p>

            <Form onSubmit={handleNewsletterSubmit}>
              <InputGroup className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="La tua email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <Button type="submit" className="newsletter-btn px-3">
                  <BsSend size={16} />
                </Button>
              </InputGroup>
            </Form>

            {subscribed && (
              <small className="text-success fw-semibold d-block mt-1">
                ✓ Iscrizione avvenuta con successo!
              </small>
            )}

            <div className="d-flex flex-column gap-2 mt-4 text-white-50 extra-small">
              <div className="d-flex align-items-center gap-2">
                <BsTruck className="text-info" />
                <span>Spedizione gratuita sopra i 500€</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsHeadset className="text-info" />
                <span>Supporto Tecnico H24</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom py-3">
        <Container>
          <Row className="align-items-center gy-2">
            <Col
              md={6}
              className="text-center text-md-start text-white-50 small"
            >
              © {new Date().getFullYear()} Byte Store. Tutti i diritti
              riservati.
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-center justify-content-md-end gap-2 flex-wrap">
                <span className="payment-badge">VISA</span>
                <span className="payment-badge">Mastercard</span>
                <span className="payment-badge">PayPal</span>
                <span className="payment-badge">Apple Pay</span>
                <span className="payment-badge">Klarna</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
