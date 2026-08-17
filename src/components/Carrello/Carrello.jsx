import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import {
  BsTrash,
  BsCartX,
  BsDashLg,
  BsPlusLg,
  BsArrowLeft,
  BsShieldCheck,
  BsCreditCard,
  BsTruck,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../context/CartContext";
import "./Carrello.css";

function Carrello() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "EPICODE10") {
      setDiscount(0.1);
      setPromoApplied(true);
    } else {
      alert("Codice promozionale non valido. Prova 'EPICODE10'");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * discount;
  const shippingCost = subtotal > 500 || cartItems.length === 0 ? 0 : 15.0;
  const grandTotal = subtotal - discountAmount + shippingCost;

  return (
    <div className="carrello-wrapper">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="fw-bold display-5 mb-1">Il Tuo Carrello</h1>
            <p className="text-white-50 mb-0">
              {cartItems.length > 0
                ? `Hai ${cartItems.reduce((a, b) => a + b.quantity, 0)} prodotti nel carrello`
                : "Il tuo carrello è attualmente vuoto"}
            </p>
          </div>

          <Link
            to="/"
            className="btn btn-outline-light d-flex align-items-center gap-2 rounded-3"
          >
            <BsArrowLeft /> Continua lo Shopping
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <Row className="g-4">
            <Col lg={8}>
              <div className="d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <Card key={item.id} className="glass-card p-3">
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3 w-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-item-img"
                        />
                        <div>
                          {item.category && (
                            <Badge bg="info" className="mb-1">
                              {item.category}
                            </Badge>
                          )}
                          <h6 className="fw-bold text-white mb-1">
                            {item.title}
                          </h6>
                          <div className="text-info fw-semibold">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 w-100 w-sm-auto border-top border-sm-0 pt-2 pt-sm-0 border-white-25">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <BsDashLg size={12} />
                          </button>
                          <span className="fw-bold px-2">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <BsPlusLg size={12} />
                          </button>
                        </div>

                        <div className="text-end" style={{ minWidth: "100px" }}>
                          <div className="fw-bold fs-5 text-white">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>

                        <button
                          className="btn-remove p-1"
                          onClick={() => removeFromCart(item.id)}
                          title="Rimuovi prodotto"
                        >
                          <BsTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}

                <div className="d-flex justify-content-end mt-2">
                  <Button
                    variant="link"
                    className="text-white-50 text-decoration-none d-flex align-items-center gap-2 p-0"
                    onClick={clearCart}
                  >
                    <BsTrash /> Svuota tutto il carrello
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <Card className="glass-card-sidebar p-4">
                <h4 className="fw-bold mb-4">Riepilogo Ordine</h4>

                <Form onSubmit={handleApplyPromo} className="mb-4">
                  <Form.Label className="small text-white-50">
                    Codice Promozionale
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="es. EPICODE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="custom-input-promo"
                    />
                    <Button
                      variant="light"
                      type="submit"
                      disabled={promoApplied || !promoCode}
                    >
                      {promoApplied ? "Applicato" : "Applica"}
                    </Button>
                  </InputGroup>
                  {promoApplied && (
                    <small className="text-success mt-1 d-block fw-semibold">
                      Sconto del 10% applicato con successo!
                    </small>
                  )}
                </Form>

                <div className="d-flex flex-column gap-2 border-bottom border-white-25 pb-3 mb-3">
                  <div className="d-flex justify-content-between text-white-50">
                    <span>Subtotale:</span>
                    <span className="text-white fw-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="d-flex justify-content-between text-success">
                      <span>Sconto promozionale:</span>
                      <span className="fw-semibold">
                        -{formatPrice(discountAmount)}
                      </span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between text-white-50">
                    <span>Spedizione:</span>
                    <span className="text-white fw-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-success">Gratuita</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold">Totale:</span>
                  <div className="text-end">
                    <div className="display-6 fw-bold text-white">
                      {formatPrice(grandTotal)}
                    </div>
                    <small className="text-white-50">IVA inclusa</small>
                  </div>
                </div>

                <Button
                  variant="light"
                  size="lg"
                  className="w-100 fw-bold py-3 text-dark d-flex align-items-center justify-content-center gap-2 rounded-3 border-0 mb-4"
                >
                  <BsCreditCard size={20} /> Procedi al Checkout
                </Button>

                <div className="d-flex flex-column gap-2 small text-white-50 border-top border-white-25 pt-3">
                  <div className="d-flex align-items-center gap-2">
                    <BsTruck className="text-info" size={18} />
                    <span>Consegna rapida in 24/48 ore</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <BsShieldCheck className="text-info" size={18} />
                    <span>Pagamenti sicuri e crittografati</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        ) : (
          <Card className="glass-card p-5 text-center my-5">
            <div className="py-4">
              <BsCartX size={64} className="text-white-50 mb-3" />
              <h3 className="fw-bold mb-2">Il tuo carrello è vuoto</h3>
              <p className="text-white-50 mb-4">
                Non hai ancora aggiunto alcun componente o prodotto al tuo
                carrello.
              </p>
              <Link
                to="/AllProducts"
                className="btn btn-light btn-lg fw-bold px-4 rounded-3"
              >
                Esplora i prodotti
              </Link>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default Carrello;
