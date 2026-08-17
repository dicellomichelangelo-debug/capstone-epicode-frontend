import {
  Carousel,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsCreditCard2Front,
  BsTruck,
  BsHeadset,
  BsShieldCheck,
  BsLaptop,
  BsCpu,
  BsDisplay,
} from "react-icons/bs";
import "./Home.css";

const slides = [
  {
    id: 1,
    title: "Studia. Crea. Vinci.",
    subtitle:
      "Consigliato per gli studenti e creator. Con la potenza delle GPU AI.",
    badgeText: "GEFORCE RTX",
    btnText: "Acquista Ora",
    btnLink: "/AllProducts",
    bgImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Dominio Assoluto nel Gaming",
    subtitle:
      "Esplora i nuovi PC Assemblati e la potenza delle componenti di ultima generazione.",
    badgeText: "POWERED BY MSI",
    btnText: "Configura il tuo PC",
    btnLink: "/configuratore",
    bgImage:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Workstation da Prestazione",
    subtitle:
      "Prestazioni estreme per rendering 3D, montaggio video e sviluppo.",
    badgeText: "PRO WORKSTATION",
    btnText: "Scopri i Prodotti",
    btnLink: "/AllProducts",
    bgImage:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1600&auto=format&fit=crop",
  },
];

const features = [
  {
    icon: <BsCreditCard2Front size={22} />,
    title: "Pagamenti a Rate",
    sub: "Anche senza busta paga",
  },
  {
    icon: <BsTruck size={22} />,
    title: "Spedizione Rapida",
    sub: "In tutta Italia in 24/48h",
  },
  {
    icon: <BsHeadset size={22} />,
    title: "Supporto Tecnico",
    sub: "Assistenza specializzata",
  },
  {
    icon: <BsShieldCheck size={22} />,
    title: "Garanzia 24 Mesi",
    sub: "Protezione completa",
  },
];

function Home() {
  return (
    <div className="home-bg pb-5">
      <Carousel
        fade
        controls={true}
        indicators={true}
        className="hero-carousel mb-4"
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 27, 75, 0.6) 55%, rgba(15, 23, 42, 0.85) 100%), url(${slide.bgImage})`,
              }}
            >
              <Container className="h-100 d-flex align-items-center">
                <Row className="w-100">
                  <Col
                    xs={12}
                    md={8}
                    lg={6}
                    className="text-start text-white hero-content py-4"
                  >
                    <Badge
                      bg="primary"
                      className="hero-badge mb-3 px-3 py-2 text-uppercase fw-bold"
                    >
                      {slide.badgeText}
                    </Badge>
                    <h1 className="display-4 fw-extrabold mb-2 text-white hero-title">
                      {slide.title}
                    </h1>
                    <p className="lead text-light opacity-75 mb-4 hero-subtitle">
                      {slide.subtitle}
                    </p>
                    <Button
                      as={Link}
                      to={slide.btnLink}
                      size="lg"
                      variant="primary"
                      className="hero-btn fw-bold px-4 py-2 border-0"
                    >
                      {slide.btnText}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container className="mb-5">
        <Row xs={1} sm={2} md={4} className="g-3">
          {features.map((feat, index) => (
            <Col key={index}>
              <div className="feature-box d-flex align-items-center gap-3 p-3 rounded text-white">
                <div className="feature-icon text-primary">{feat.icon}</div>
                <div className="text-start">
                  <h6 className="mb-0 fw-bold">{feat.title}</h6>
                  <small className="text-white-50">{feat.sub}</small>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <h3 className="text-white text-start fw-bold mb-4">
          Esplora per Categoria
        </h3>
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card className="category-card text-white text-start h-100 p-3">
              <BsLaptop size={40} className="mb-3 text-primary" />
              <h4>Notebook Gaming</h4>
              <p className="text-white-50 small">
                Portatili ad alte prestazioni con schede grafiche dedicate.
              </p>
              <Button
                as={Link}
                to="/categoria/windows"
                variant="outline-light"
                size="sm"
                className="mt-auto w-auto me-auto"
              >
                Vedi Tutti
              </Button>
            </Card>
          </Col>
          <Col>
            <Card className="category-card text-white text-start h-100 p-3">
              <BsCpu size={40} className="mb-3 text-primary" />
              <h4>PC Assemblati</h4>
              <p className="text-white-50 small">
                Desktop da gioco pronti all'uso o configurabili su misura.
              </p>
              <Button
                as={Link}
                to="/configuratore"
                variant="outline-light"
                size="sm"
                className="mt-auto w-auto me-auto"
              >
                Configura Ora
              </Button>
            </Card>
          </Col>
          <Col>
            <Card className="category-card text-white text-start h-100 p-3">
              <BsDisplay size={40} className="mb-3 text-primary" />
              <h4>Accessori</h4>
              <p className="text-white-50 small">
                Tastiere e mouse da pro gamer.
              </p>
              <Button
                as={Link}
                to="/categoria/accessori"
                variant="outline-light"
                size="sm"
                className="mt-auto w-auto me-auto"
              >
                Scopri Offerte
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
