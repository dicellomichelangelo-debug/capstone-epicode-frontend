import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Badge } from "react-bootstrap";
import {
  BsStarFill,
  BsCartPlus,
  BsTrash,
  BsArrowLeft,
  BsTruck,
  BsShieldCheck,
} from "react-icons/bs";
import { products } from "../../data/productsData";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, removeFromCart, isInCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 text-white product-detail-page">
        <Container className="text-center">
          <h2 className="fw-bold mb-3">Prodotto non trovato</h2>
          <Button
            variant="light"
            className="mt-2 fw-semibold px-4 py-2 rounded-pill shadow"
            onClick={() => navigate("/")}
          >
            Torna alla Home
          </Button>
        </Container>
      </div>
    );
  }

  const added = isInCart(product.id);

  const formattedReviews = product.reviews
    ? product.reviews.toString().includes("(")
      ? `${product.reviews} recensioni`
      : `(${product.reviews} recensioni)`
    : "";

  return (
    <div className="min-vh-100 py-5 text-white product-detail-page">
      <Container>
        <Button
          variant="outline-light"
          className="mb-4 d-inline-flex align-items-center gap-2 border-2 fw-semibold shadow-sm rounded-pill px-3 py-2 btn-back"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft /> Torna indietro
        </Button>

        <Row className="p-4 p-md-5 rounded-4 align-items-center product-glass-card">
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <div className="product-img-box">
              <Image
                src={product.image}
                alt={product.title}
                fluid
                className="product-detail-img"
              />
            </div>
          </Col>

          <Col lg={6} className="ps-lg-5 text-start">
            {product.badge && (
              <Badge
                bg="light"
                className="text-dark mb-3 px-3 py-2 fs-6 rounded-pill fw-bold"
              >
                {product.badge}
              </Badge>
            )}

            <h1 className="fw-bold display-6 mb-2 product-detail-title">
              {product.title}
            </h1>
            <p className="fs-5 text-white-50 mb-4">{product.subtitle}</p>

            <div className="d-flex align-items-center gap-2 mb-4 p-2 px-3 rounded-3 d-inline-flex rating-badge">
              <div className="text-warning d-flex">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} size={16} className="me-1" />
                ))}
              </div>
              <span className="fw-bold">{product.rating}</span>
              {formattedReviews && (
                <span className="text-white-50">{formattedReviews}</span>
              )}
            </div>

            <div className="mb-4">
              <small className="text-white-50 d-block fs-6">
                Prezzo consigliato
              </small>
              <span className="display-4 fw-bold price-display">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="d-flex flex-column gap-2 mb-4 text-white-50 small">
              <div className="d-flex align-items-center gap-2 benefit-item">
                <BsTruck size={18} className="text-white" />
                <span>Spedizione gratuita in 24/48 ore</span>
              </div>
              <div className="d-flex align-items-center gap-2 benefit-item">
                <BsShieldCheck size={18} className="text-white" />
                <span>Garanzia ufficiale 24 mesi e reso entro 30 giorni</span>
              </div>
            </div>

            {added ? (
              <Button
                variant="danger"
                size="lg"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 shadow rounded-3 border-0 btn-cart-action"
                onClick={() => removeFromCart(product.id)}
              >
                <BsTrash size={22} /> Rimuovi dal Carrello
              </Button>
            ) : (
              <Button
                variant="light"
                size="lg"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 text-dark shadow rounded-3 border-0 btn-cart-action"
                onClick={() => addToCart(product)}
              >
                <BsCartPlus size={22} /> Aggiungi al Carrello
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
