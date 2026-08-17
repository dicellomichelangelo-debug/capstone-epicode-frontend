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
import {
  BsExclamationTriangleFill,
  BsCheckCircleFill,
  BsCartPlus,
  BsXCircle,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import { categories, products } from "../../data/productsData";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../context/CartContext";
import "./Configuratore.css";

const HARDWARE_CATEGORY_IDS = [
  "cpu",
  "motherboard",
  "ram",
  "gpu",
  "storage",
  "psu",
  "case",
];

function Configuratore() {
  const { addToCart } = useCart();

  const [build, setBuild] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null,
  });

  const builderCategories = categories.filter((cat) =>
    HARDWARE_CATEGORY_IDS.includes(cat.id),
  );

  const handleSelect = (category, productId) => {
    const selectedProduct =
      products.find((p) => p.id === parseInt(productId, 10)) || null;

    setBuild((prev) => {
      const updated = { ...prev, [category]: selectedProduct };

      if (category === "cpu" && updated.motherboard) {
        if (
          !selectedProduct ||
          updated.motherboard.specs?.socket !== selectedProduct.specs?.socket
        ) {
          updated.motherboard = null;
        }
      }

      if (category === "motherboard" && updated.ram) {
        if (
          !selectedProduct ||
          updated.ram.specs?.ramType !== selectedProduct.specs?.ramType
        ) {
          updated.ram = null;
        }
      }

      if (category === "motherboard" && updated.case) {
        if (
          selectedProduct &&
          updated.case.specs?.supportedFormFactors &&
          !updated.case.specs.supportedFormFactors.includes(
            selectedProduct.specs?.formFactor,
          )
        ) {
          updated.case = null;
        }
      }

      return updated;
    });
  };

  const handleResetAll = () => {
    setBuild({
      cpu: null,
      motherboard: null,
      ram: null,
      gpu: null,
      storage: null,
      psu: null,
      case: null,
    });
  };

  const getFilteredProducts = (categoryId) => {
    let list = products.filter((p) => p.category === categoryId);

    if (categoryId === "motherboard" && build.cpu) {
      list = list.filter((p) => p.specs?.socket === build.cpu.specs?.socket);
    }

    if (categoryId === "cpu" && build.motherboard) {
      list = list.filter(
        (p) => p.specs?.socket === build.motherboard.specs?.socket,
      );
    }

    if (categoryId === "ram" && build.motherboard?.specs?.ramType) {
      list = list.filter(
        (p) => p.specs?.ramType === build.motherboard.specs?.ramType,
      );
    }

    if (categoryId === "case" && build.motherboard?.specs?.formFactor) {
      list = list.filter((p) =>
        p.specs?.supportedFormFactors?.includes(
          build.motherboard.specs?.formFactor,
        ),
      );
    }

    return list;
  };

  const compatibilityWarnings = [];

  const totalTdp =
    (build.cpu?.specs?.tdp || 0) + (build.gpu?.specs?.tdp || 0) + 100;
  const psuWattage = build.psu?.specs?.wattage || 0;
  const isPsuEnough = !build.psu || psuWattage >= totalTdp;

  if (build.psu && !isPsuEnough) {
    compatibilityWarnings.push(
      `L'alimentatore selezionato (${psuWattage}W) non soddisfa il consumo stimato del sistema (${totalTdp}W).`,
    );
  }

  if (
    build.cpu &&
    build.motherboard &&
    build.cpu.specs?.socket !== build.motherboard.specs?.socket
  ) {
    compatibilityWarnings.push(
      `Il socket della CPU (${build.cpu.specs?.socket}) non coincide con quello della Scheda Madre (${build.motherboard.specs?.socket}).`,
    );
  }

  if (
    build.ram &&
    build.motherboard &&
    build.ram.specs?.ramType &&
    build.motherboard.specs?.ramType &&
    build.ram.specs.ramType !== build.motherboard.specs.ramType
  ) {
    compatibilityWarnings.push(
      `La scheda madre richiede memorie ${build.motherboard.specs.ramType}, ma hai selezionato RAM ${build.ram.specs.ramType}.`,
    );
  }

  const isCompatible = compatibilityWarnings.length === 0;

  const totalPrice = Object.values(build)
    .filter(Boolean)
    .reduce((sum, item) => sum + item.price, 0);

  const hasSelectedItems = Object.values(build).some(Boolean);

  const handleAddBuildToCart = () => {
    if (!isCompatible) return;
    Object.values(build).forEach((item) => {
      if (item) {
        addToCart(item);
      }
    });
  };

  return (
    <div className="configuratore-wrapper py-5 text-white">
      <Container>
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-2">Configuratore PC Hardware</h1>
          <p className="text-white-50 fs-5">
            Assembla il tuo PC personalizzato con controllo in tempo reale della
            compatibilità dei componenti
          </p>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <div className="d-flex flex-column gap-3">
              {builderCategories.map((cat) => {
                const categoryProducts = getFilteredProducts(cat.id);
                const currentSelected = build[cat.id];

                return (
                  <Card
                    key={cat.id}
                    className="glass-card p-3 border-0 shadow-sm"
                  >
                    <Form.Group className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                      <div
                        className="cat-label-box"
                        style={{ minWidth: "150px" }}
                      >
                        <Form.Label className="fw-bold mb-0 text-white fs-6">
                          {cat.label}
                        </Form.Label>
                      </div>

                      <div className="d-flex align-items-center gap-2 flex-grow-1 w-100">
                        <Form.Select
                          value={currentSelected?.id || ""}
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

                        {currentSelected && (
                          <Button
                            variant="outline-danger"
                            className="d-flex align-items-center justify-content-center p-2 rounded-2"
                            title={`Rimuovi ${cat.label}`}
                            onClick={() => handleSelect(cat.id, "")}
                          >
                            <BsXCircle size={20} />
                          </Button>
                        )}
                      </div>
                    </Form.Group>
                  </Card>
                );
              })}
            </div>
          </Col>

          <Col lg={4}>
            <Card className="glass-card-sidebar p-4 border-0 shadow">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Riepilogo PC</h4>

                {hasSelectedItems && (
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="d-flex align-items-center gap-1 border-white-50 text-white-50 btn-reset"
                    onClick={handleResetAll}
                  >
                    <BsArrowCounterclockwise /> Svuota
                  </Button>
                )}
              </div>

              {hasSelectedItems && (
                <div className="mb-4">
                  {isCompatible ? (
                    <Alert
                      variant="success"
                      className="d-flex align-items-center gap-2 mb-0 py-2"
                    >
                      <BsCheckCircleFill size={18} />
                      <small className="fw-semibold">
                        Tutti i componenti selezionati sono compatibili!
                      </small>
                    </Alert>
                  ) : (
                    <Alert variant="danger" className="mb-0 py-2">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <BsExclamationTriangleFill size={18} />
                        <strong className="small">
                          Problema di compatibilità:
                        </strong>
                      </div>
                      <ul className="mb-0 ps-3 small">
                        {compatibilityWarnings.map((warn, index) => (
                          <li key={index}>{warn}</li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                </div>
              )}

              <div className="d-flex flex-column gap-2 mb-4 border-bottom border-white-25 pb-3">
                {builderCategories.map((cat) => {
                  const item = build[cat.id];
                  return (
                    <div
                      key={cat.id}
                      className="d-flex justify-content-between small text-white-50"
                    >
                      <span>{cat.label}:</span>
                      <span className="text-white text-end fw-semibold ms-2">
                        {item ? item.title : "Non selezionato"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mb-4">
                <small className="text-white-50 d-block">
                  Consumo Energetico Stimato
                </small>
                <Badge
                  bg={isPsuEnough ? "info" : "danger"}
                  className="fs-6 mt-1"
                >
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
                disabled={!hasSelectedItems || !isCompatible}
                onClick={handleAddBuildToCart}
                className="w-100 fw-bold py-3 text-dark d-flex align-items-center justify-content-center gap-2 rounded-3 border-0 shadow"
              >
                <BsCartPlus size={20} /> Aggiungi al Carrello
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Configuratore;
