import { Row, Col, Card, Badge, Container } from "react-bootstrap";
import { BsHeart, BsStarFill, BsBoxArrowUpRight } from "react-icons/bs";
import "./Home.css";

const products = [
  /* i tuoi dati prodotti */
];

function Home() {
  return (
    <Container fluid className="home-bg p-4">
      <Row xs={1} sm={2} md={2} lg={4} className="g-4">
        {products.map((item) => (
          <Col key={item.id}>
            <Card className="product-card text-start position-relative h-100">
              <BsHeart className="heart-icon" />

              {item.badge && (
                <Badge bg="primary" className="badge-overlay">
                  {item.badge}
                </Badge>
              )}

              <Card.Img
                variant="top"
                src={item.image}
                className="p-3"
                alt={item.title}
              />

              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-6 fw-bold mb-1">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    {item.subtitle}
                  </Card.Text>

                  <div className="small text-muted mb-2 d-flex align-items-center gap-1">
                    <span>Voto medio {item.rating}</span>
                    <div className="text-dark">
                      {[...Array(5)].map((_, i) => (
                        <BsStarFill key={i} size={10} className="me-1" />
                      ))}
                    </div>
                    <span>{item.reviews}</span>
                  </div>

                  <div className="small text-muted mb-3">
                    {item.offers} offerte
                  </div>
                </div>

                <div>
                  <div className="small text-muted">a partire da</div>
                  <div className="price-text">€ {item.price}</div>
                  <a
                    href="#dettagli"
                    className="text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1 mt-1"
                  >
                    <BsBoxArrowUpRight size={12} /> Dettagli del prodotto
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
