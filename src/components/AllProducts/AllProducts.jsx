import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
  BsHeart,
  BsStarFill,
  BsBoxArrowUpRight,
  BsCartPlus,
  BsTrash,
} from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { products } from "../../data/productsData";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../context/CartContext";
import "./AllProducts.css";

function AllProducts() {
  const context = useOutletContext() || {};
  const {
    searchTerm = "",
    selectedCategory = "all",
    maxPrice = 3000,
    onlyDiscounted = false,
    inStockOnly = false,
  } = context;

  const { addToCart, removeFromCart, isInCart } = useCart();

  const filteredProducts = products.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      item.title?.toLowerCase().includes(term) ||
      item.subtitle?.toLowerCase().includes(term);
    const matchesCategory =
      selectedCategory === "all" ||
      (item.category &&
        item.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesPrice = item.price <= maxPrice;

    const matchesDiscount =
      !onlyDiscounted ||
      item.badge?.toLowerCase().includes("offerta") ||
      item.badge?.toLowerCase().includes("sconto") ||
      item.isOffer === true;

    const matchesStock = !inStockOnly || item.inStock === true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesDiscount &&
      matchesStock
    );
  });

  return (
    <Container fluid className="home-bg p-4">
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const added = isInCart(item.id);

            return (
              <Col key={item.id}>
                <Card className="product-card text-start position-relative h-100 shadow-sm border-0">
                  <BsHeart className="heart-icon" />

                  {item.badge && (
                    <Badge bg="primary" className="badge-overlay">
                      {item.badge}
                    </Badge>
                  )}

                  <Link
                    to={`/prodotto/${item.id}`}
                    className="product-img-wrapper"
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="p-3 product-card-img"
                      alt={item.title}
                    />
                  </Link>

                  <Card.Body className="d-flex flex-column justify-content-between p-3">
                    <div>
                      <Link
                        to={`/prodotto/${item.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <Card.Title className="fs-6 fw-bold mb-1 product-title">
                          {item.title}
                        </Card.Title>
                      </Link>

                      <Card.Text className="text-muted small mb-2 text-truncate">
                        {item.subtitle}
                      </Card.Text>

                      <div className="small text-muted mb-2 d-flex align-items-center gap-1">
                        <span>Voto medio {item.rating}</span>
                        <div className="text-warning d-inline-flex">
                          {[...Array(5)].map((_, i) => (
                            <BsStarFill key={i} size={10} className="me-1" />
                          ))}
                        </div>
                        {item.reviews && <span>({item.reviews})</span>}
                      </div>

                      {item.offers && (
                        <div className="small text-muted mb-2">
                          {item.offers} offerte
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-top border-light-subtle">
                      <small className="text-muted d-block">a partire da</small>
                      <div className="price-text mb-2">
                        {formatPrice(item.price)}
                      </div>

                      <div className="d-flex flex-column gap-2">
                        <Link
                          to={`/prodotto/${item.id}`}
                          className="text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
                        >
                          <BsBoxArrowUpRight size={12} /> Dettagli del prodotto
                        </Link>

                        {added ? (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <BsTrash size={14} /> Rimuovi
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                            onClick={() => addToCart(item)}
                          >
                            <BsCartPlus size={16} /> Aggiungi al carrello
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col xs={12} className="text-center py-5 text-white">
            <h4 className="fw-semibold">Nessun prodotto trovato</h4>
            <p className="text-white-50">
              Nessun risultato corrisponde ai filtri selezionati. Prova a
              modificare la ricerca o a resettare i filtri dalla barra laterale.
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AllProducts;
