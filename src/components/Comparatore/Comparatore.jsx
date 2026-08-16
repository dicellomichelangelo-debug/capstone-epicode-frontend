import { useState } from "react";
import { Container, Row, Col, Form, Card, Table } from "react-bootstrap";
import { BsStarFill, BsArrowLeftRight } from "react-icons/bs";
import { categories, products } from "../../data/productsData";
import { formatPrice } from "../../utils/formatters";
import "./Comparatore.css";

function Comparatore() {
  const [selectedCategory, setSelectedCategory] = useState("cpu");
  const [prodAId, setProdAId] = useState("");
  const [prodBId, setProdBId] = useState("");

  const categoryProducts = products.filter(
    (p) => p.category === selectedCategory,
  );
  const prodA = products.find((p) => p.id === parseInt(prodAId));
  const prodB = products.find((p) => p.id === parseInt(prodBId));

  const specKeys =
    prodA || prodB ? Object.keys((prodA || prodB)?.specs || {}) : [];

  return (
    <div className="comparatore-wrapper">
      <Container>
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-2">Comparatore Prodotti</h1>
          <p className="text-white-50 fs-5">
            Seleziona la categoria e scegli due prodotti da confrontare
            affiancati
          </p>
        </div>

        <Card className="glass-card p-4 mb-4">
          <Form.Group>
            <Form.Label className="fw-bold fs-5 mb-2">
              1. Seleziona la Categoria
            </Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setProdAId("");
                setProdBId("");
              }}
              className="custom-select p-3"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="glass-card p-4 h-100">
              <Form.Group>
                <Form.Label className="fw-bold mb-2">Primo Prodotto</Form.Label>
                <Form.Select
                  value={prodAId}
                  onChange={(e) => setProdAId(e.target.value)}
                  className="custom-select p-2"
                >
                  <option value="">-- Seleziona Prodotto 1 --</option>
                  {categoryProducts.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      disabled={p.id === parseInt(prodBId)}
                    >
                      {p.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="glass-card p-4 h-100">
              <Form.Group>
                <Form.Label className="fw-bold mb-2">
                  Secondo Prodotto
                </Form.Label>
                <Form.Select
                  value={prodBId}
                  onChange={(e) => setProdBId(e.target.value)}
                  className="custom-select p-2"
                >
                  <option value="">-- Seleziona Prodotto 2 --</option>
                  {categoryProducts.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      disabled={p.id === parseInt(prodAId)}
                    >
                      {p.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card>
          </Col>
        </Row>

        {prodA && prodB ? (
          <Card className="glass-card p-4 overflow-hidden">
            <Table
              responsive
              borderless
              className="text-white align-middle mb-0"
            >
              <thead>
                <tr className="border-bottom border-white-25 text-center">
                  <th style={{ width: "20%" }}>Specifica</th>
                  <th style={{ width: "40%" }} className="p-3">
                    <img
                      src={prodA.image}
                      alt={prodA.title}
                      className="product-img-box mb-2"
                    />
                    <h5 className="fw-bold text-white mb-1">{prodA.title}</h5>
                    <div className="text-info fw-bold fs-4">
                      {formatPrice(prodA.price)}
                    </div>
                  </th>
                  <th style={{ width: "40%" }} className="p-3">
                    <img
                      src={prodB.image}
                      alt={prodB.title}
                      className="product-img-box mb-2"
                    />
                    <h5 className="fw-bold text-white mb-1">{prodB.title}</h5>
                    <div className="text-info fw-bold fs-4">
                      {formatPrice(prodB.price)}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-bottom border-white-10 text-center">
                  <td className="fw-bold text-white-50 text-start">
                    Valutazione
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-1 text-warning">
                      <BsStarFill /> <span>{prodA.rating}</span>
                      <small className="text-white-50">{prodA.reviews}</small>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-1 text-warning">
                      <BsStarFill /> <span>{prodB.rating}</span>
                      <small className="text-white-50">{prodB.reviews}</small>
                    </div>
                  </td>
                </tr>

                {specKeys.map((key) => (
                  <tr
                    key={key}
                    className="border-bottom border-white-10 text-center"
                  >
                    <td className="fw-bold text-white-50 text-start text-capitalize">
                      {key}
                    </td>
                    <td className="fw-semibold">{prodA.specs[key] ?? "—"}</td>
                    <td className="fw-semibold">{prodB.specs[key] ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ) : (
          <div className="text-center py-5 text-white-50">
            <BsArrowLeftRight size={48} className="mb-3 opacity-50" />
            <p className="fs-5">
              Seleziona entrambi i prodotti dai menù a tendina per visualizzare
              il confronto.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Comparatore;
