import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
  BsHeart,
  BsStarFill,
  BsBoxArrowUpRight,
  BsCartPlus,
  BsTrash,
  BsCpu,
  BsGpuCard,
  BsMemory,
  BsPcDisplay,
  BsLightningCharge,
} from "react-icons/bs";
import { products, categories } from "../../data/productsData";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../context/CartContext";

const desktopSubFilters = [
  {
    id: "all_hardware",
    label: "Tutti i Prodotti & Componenti",
    icon: <BsPcDisplay />,
  },
  { id: "pcdesktop", label: "PC Preassemblati", icon: <BsPcDisplay /> },
  { id: "cpu", label: "Processori (CPU)", icon: <BsCpu /> },
  { id: "gpu", label: "Schede Video (GPU)", icon: <BsGpuCard /> },
  { id: "ram", label: "Memorie RAM", icon: <BsMemory /> },
  { id: "motherboard", label: "Schede Madri", icon: <BsPcDisplay /> },
  { id: "psu", label: "Alimentatori (PSU)", icon: <BsLightningCharge /> },
];

function CategoryPage() {
  const { categoryName } = useParams();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const slug = categoryName ? categoryName.toLowerCase() : "";

  const isDesktopCategory = slug === "pcdesktop" || slug === "desktop";

  const [activeSubFilter, setActiveSubFilter] = useState("all_hardware");

  useEffect(() => {
    setActiveSubFilter("all_hardware");
  }, [categoryName]);

  const hardwareCategoryIds = [
    "pcdesktop",
    "cpu",
    "motherboard",
    "ram",
    "gpu",
    "psu",
  ];

  const filteredProducts = products.filter((item) => {
    if (!item.category) return false;
    const itemCat = item.category.toLowerCase();

    if (isDesktopCategory) {
      if (activeSubFilter === "all_hardware") {
        return hardwareCategoryIds.includes(itemCat);
      }
      return itemCat === activeSubFilter;
    }

    return itemCat === slug;
  });

  const categoryObj = categories.find((c) => c.id === slug);
  const pageTitle = isDesktopCategory
    ? "PC Desktop & Componenti Hardware"
    : categoryObj
      ? categoryObj.label
      : categoryName;

  return (
    <Container fluid className="home-bg p-4 min-vh-100">
      <div className="mb-4 text-start text-white">
        <h2 className="fw-bold text-capitalize">{pageTitle}</h2>
        <p className="text-white-50 mb-3">
          Risultati trovati: {filteredProducts.length}
        </p>

        {isDesktopCategory && (
          <div className="d-flex flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-25">
            {desktopSubFilters.map((sub) => (
              <Button
                key={sub.id}
                variant={
                  activeSubFilter === sub.id ? "primary" : "outline-light"
                }
                size="sm"
                className="d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold"
                onClick={() => setActiveSubFilter(sub.id)}
              >
                {sub.icon}
                {sub.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const added = isInCart(item.id);

            return (
              <Col key={item.id}>
                <Card className="product-card text-start position-relative h-100">
                  <BsHeart className="heart-icon" />

                  {item.badge && (
                    <Badge bg="primary" className="badge-overlay">
                      {item.badge}
                    </Badge>
                  )}

                  <Link to={`/prodotto/${item.id}`}>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="p-3"
                      alt={item.title}
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </Link>

                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Link
                        to={`/prodotto/${item.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <Card.Title className="fs-6 fw-bold mb-1">
                          {item.title}
                        </Card.Title>
                      </Link>

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
                      </div>
                    </div>

                    <div>
                      <small className="text-muted d-block">a partire da</small>
                      <div className="price-text mb-2">
                        {formatPrice(item.price)}
                      </div>

                      <div className="d-flex flex-column gap-2">
                        <Link
                          to={`/prodotto/${item.id}`}
                          className="text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
                        >
                          <BsBoxArrowUpRight size={12} /> Dettagli prodotto
                        </Link>

                        {added ? (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 mt-1 fw-semibold"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <BsTrash size={14} /> Rimuovi
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 mt-1 fw-semibold"
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
              Non ci sono prodotti disponibili per il filtro selezionato.
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default CategoryPage;
