import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Badge } from "react-bootstrap";
import {
  BsStarFill,
  BsCartPlus,
  BsArrowLeft,
  BsTruck,
  BsShieldCheck,
} from "react-icons/bs";
import { products } from "../../data/productsData";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trova il prodotto nell'array importato
  const product = products.find((p) => p.id === parseInt(id));

  // Gestione caso di prodotto non trovato
  if (!product) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 text-white"
        style={{
          background:
            "linear-gradient(90deg, #4da9ff 30%, #355cc9 60%, #1d1e6e 100%)",
        }}
      >
        <Container className="text-center">
          <h2>Prodotto non trovato</h2>
          <Button
            variant="light"
            className="mt-3 fw-semibold"
            onClick={() => navigate("/")}
          >
            Torna alla Home
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5 text-white"
      style={{
        background:
          "linear-gradient(90deg, #4da9ff 30%, #355cc9 60%, #1d1e6e 100%)",
      }}
    >
      <Container>
        <Button
          variant="outline-light"
          className="mb-4 d-inline-flex align-items-center gap-2 border-2 fw-semibold shadow-sm"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft /> Torna indietro
        </Button>

        <Row
          className="p-4 p-md-5 rounded-4 shadow-lg align-items-center border border-white border-opacity-25"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <div className="bg-white p-4 rounded-4 shadow d-inline-block w-100">
              <Image
                src={product.image}
                alt={product.title}
                fluid
                style={{ maxHeight: "380px", objectFit: "contain" }}
              />
            </div>
          </Col>

          <Col lg={6} className="ps-lg-5">
            {product.badge && (
              <Badge
                bg="light"
                className="text-dark mb-3 px-3 py-2 fs-6 rounded-pill fw-bold"
              >
                {product.badge}
              </Badge>
            )}

            <h1 className="fw-bold display-6 mb-2">{product.title}</h1>
            <p className="fs-5 text-white-50 mb-4">{product.subtitle}</p>
            <div className="d-flex align-items-center gap-2 mb-4 bg-black bg-opacity-20 p-2 px-3 rounded-3 d-inline-flex">
              <div className="text-warning d-flex">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} size={16} className="me-1" />
                ))}
              </div>
              <span className="fw-bold">{product.rating}</span>
              <span className="text-white-50">
                {product.reviews} recensioni
              </span>
            </div>

            <div className="mb-4">
              <small className="text-white-50 d-block fs-6">
                Prezzo consigliato
              </small>
              <span className="display-4 fw-bold">€ {product.price}</span>
            </div>

            <div className="d-flex flex-column gap-2 mb-4 text-white-50 small">
              <div className="d-flex align-items-center gap-2">
                <BsTruck size={18} className="text-white" />
                <span>Spedizione gratuita in 24/48 ore</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsShieldCheck size={18} className="text-white" />
                <span>Garanzia ufficiale 24 mesi e reso entro 30 giorni</span>
              </div>
            </div>

            <Button
              variant="light"
              size="lg"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 fw-bold text-dark shadow rounded-3 border-0"
            >
              <BsCartPlus size={22} /> Aggiungi al Carrello
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
