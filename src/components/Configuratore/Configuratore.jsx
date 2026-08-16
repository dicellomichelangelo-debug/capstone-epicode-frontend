import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { BsExclamationTriangleFill, BsCartPlus } from "react-icons/bs";
import { categories, products } from "../../data/productsData";
import { formatPrice } from "../../utils/formatters";
import "./Configuratore.css";

function Configuratore() {
  const [build, setBuild] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
  });

  const handleSelect = (category, productId) => {
    const selectedProduct =
      products.find((p) => p.id === parseInt(productId)) || null;

    setBuild((prev) => {
      const updated = { ...prev, [category]: selectedProduct };
      if (category === "cpu" && updated.motherboard) {
        if (
          updated.motherboard.specs.socket !== selectedProduct?.specs.socket
        ) {
          updated.motherboard = null;
        }
      }
      return updated;
    });
  };

  const filteredMotherboards = products.filter((p) => {
    if (p.category !== "motherboard") return false;
    if (build.cpu) {
      return p.specs.socket === build.cpu.specs.socket;
    }
    return true;
  });

  const totalTdp =
    (build.cpu?.specs.tdp || 0) + (build.gpu?.specs.tdp || 0) + 100;
  const psuWattage = build.psu?.specs.wattage || 0;
  const isPsuEnough = !build.psu || psuWattage >= totalTdp;

  const totalPrice = Object.values(build)
    .filter(Boolean)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="configuratore-wrapper">
      <Container>
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-2">Configuratore PC</h1>
          <p className="text-white-50 fs-5">
            Scegli i componenti tramite i menù a tendina con controllo
            automatico di compatibilità
          </p>
        </div>

        <Row className="g-4">
          {/* Sezione Selezioni Componenti */}
          <Col lg={8}>
            <div className="d-flex flex-column gap-3">
              {categories.map((cat) => {
                const categoryProducts =
                  cat.id === "motherboard"
                    ? filteredMotherboards
                    : products.filter((p) => p.category === cat.id);

                return (
                  <Card key={cat.id} className="glass-card p-3">
                    <Form.Group className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                      <div className="cat-label-box">
                        <Form.Label className="fw-bold mb-0 text-white fs-6">
                          {cat.label}
                        </Form.Label>
                      </div>

                      <Form.Select
                        value={build[cat.id]?.id || ""}
                        onChange={(e) => handleSelect(cat.id, e.target.value)}
                        className="custom-select p-2"
                      >
                        <option value="">-- Seleziona {cat.label} --</option>
                        {categoryProducts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} - {formatPrice(p.price)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Card>
                );
              })}
            </div>
          </Col>

          {/* Sezione Riepilogo */}
          <Col lg={4}>
            <Card className="glass-card-sidebar p-4">
              <h4 className="fw-bold mb-4">Riepilogo PC</h4>

              {build.psu && !isPsuEnough && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center gap-2 small"
                >
                  <BsExclamationTriangleFill size={20} />
                  <span>
                    Alimentatore sottodimensionato! Consumo stimato:{" "}
                    <strong>{totalTdp}W</strong>.
                  </span>
                </Alert>
              )}

              <div className="d-flex flex-column gap-2 mb-4 border-bottom border-white-25 pb-3">
                {Object.entries(build).map(([key, item]) => (
                  <div
                    key={key}
                    className="d-flex justify-content-between small text-white-50"
                  >
                    <span className="text-capitalize">{key}:</span>
                    <span className="text-white text-end fw-semibold">
                      {item ? item.title : "Non selezionato"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <small className="text-white-50 d-block">
                  Consumo Energetico Stimato
                </small>
                <Badge bg="info" className="fs-6 mt-1">
                  ~ {totalTdp} Watt
                </Badge>
              </div>

              <div className="mb-4">
                <small className="text-white-50 d-block">
                  Totale Configurazione
                </small>
                <div className="display-6 fw-bold text-white">
                  {formatPrice(totalPrice)}
                </div>
              </div>

              <Button
                variant="light"
                size="lg"
                disabled={totalPrice === 0 || !isPsuEnough}
                className="w-100 fw-bold py-3 text-dark d-flex align-items-center justify-content-center gap-2 rounded-3 border-0"
              >
                <BsCartPlus size={20} /> Aggiungi Configurazione
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Configuratore;
