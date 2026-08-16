import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Badge,
  Button,
  Offcanvas,
} from "react-bootstrap";
import {
  BsSearch,
  BsSliders,
  BsTags,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { categories } from "../../data/productsData";
import "./Sidebar.css";

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const filterCategories = [
    { id: "all", label: "Tutti i Prodotti" },
    ...categories,
  ];

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setMaxPrice(3000);
    setOnlyDiscounted(false);
    setInStockOnly(false);
  };

  const filterContent = (
    <div className="d-flex flex-column h-100 justify-content-between">
      <div>
        <div className="d-flex align-items-center justify-content-between mb-3 mt-2">
          <h5
            className="fw-bold fs-6 text-uppercase mb-0"
            style={{ color: "#0f2942", letterSpacing: "1px" }}
          >
            Filtra Prodotti
          </h5>
          {(searchTerm ||
            selectedCategory !== "all" ||
            maxPrice < 3000 ||
            onlyDiscounted ||
            inStockOnly) && (
            <Button
              variant="link"
              className="p-0 text-decoration-none small text-danger d-flex align-items-center gap-1"
              onClick={handleResetFilters}
            >
              <BsArrowCounterclockwise size={12} /> Reset
            </Button>
          )}
        </div>

        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Cerca prodotto..."
            aria-label="Cerca"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "20px 0 0 20px",
              borderRight: "none",
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          />
          <InputGroup.Text
            style={{
              borderRadius: "0 20px 20px 0",
              borderLeft: "none",
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>

        <div className="mb-4">
          <div className="fw-semibold small text-muted text-uppercase mb-2 d-flex align-items-center gap-1">
            <BsTags size={14} /> Categorie
          </div>
          <div className="d-flex flex-column gap-1">
            {filterCategories.map((cat) => (
              <Form.Check
                key={cat.id}
                type="radio"
                id={`cat-${cat.id}`}
                name="category-group"
                label={cat.label}
                checked={selectedCategory === cat.id}
                onChange={() => setSelectedCategory(cat.id)}
                className="custom-filter-radio small fw-medium text-capitalize"
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-semibold small text-muted text-uppercase">
              Prezzo Max
            </span>
            <Badge bg="dark" className="px-2 py-1">
              € {maxPrice}
            </Badge>
          </div>
          <Form.Range
            min={50}
            max={3000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className="mb-4 d-flex flex-column gap-2">
          <Form.Check
            type="switch"
            id="discount-switch"
            label="Solo in Offerta"
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
            className="small fw-semibold"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Container fluid className="flex-grow-1 p-0">
      <div className="d-lg-none p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
        <span className="fw-bold text-dark">Catalogo Prodotti</span>
        <Button
          variant="outline-dark"
          size="sm"
          className="d-flex align-items-center gap-2"
          onClick={() => setShowMobileFilter(true)}
        >
          <BsSliders /> Filtri
        </Button>
      </div>

      <Row className="g-0 min-vh-100">
        <Col
          lg={2}
          className="custom-sidebar p-3 d-none d-lg-flex flex-column justify-content-between"
        >
          {filterContent}
        </Col>

        <Col xs={12} lg={10} className="px-0">
          <Outlet
            context={{
              searchTerm,
              setSearchTerm,
              selectedCategory,
              maxPrice,
              onlyDiscounted,
              inStockOnly,
            }}
          />
        </Col>
      </Row>

      <Offcanvas
        show={showMobileFilter}
        onHide={() => setShowMobileFilter(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Filtri</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{filterContent}</Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default Sidebar;
