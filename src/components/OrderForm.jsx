// src/components/OrderForm.jsx
import { useState } from "react";
import { submitOrder } from "../mockApi/mockApi.v1.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  quantity: "",
  paymentMethod: "",
  notes: "",
};

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  date: "",
  quantity: "",
  paymentMethod: "",
};

// ─── Modal overlay ────────────────────────────────────────────────────────────
function Modal({ type, name, orderId, onClose }) {
  if (!type) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "1rem",
    animation: "fadeIn 0.2s ease",
  };

  const cardStyle = {
    background: "var(--color-background-primary, #fff)",
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    border: "0.5px solid var(--color-border-tertiary)",
    animation: "slideUp 0.25s ease",
  };

  if (type === "loading") {
    return (
      <div style={overlayStyle} role="dialog" aria-modal="true" aria-label="Procesando pedido">
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
            <Spinner />
          </div>
          <p style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            margin: "0 0 0.5rem",
          }}>
            Procesando tu pedido...
          </p>
          <p style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            margin: 0,
          }}>
            Un momento, por favor.
          </p>
        </div>
      </div>
    );
  }

  if (type === "validation") {
    return (
      <div
        style={overlayStyle}
        role="alertdialog"
        aria-modal="true"
        aria-label="Formulario incompleto"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div style={cardStyle}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--color-background-warning, #FEF3C7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <p style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "var(--color-error)",
            margin: "0 0 0.5rem",
          }}>
            Datos incompletos
          </p>
          <p style={{
            fontSize: "14px",
            color: "var(--color-espresso)",
            margin: "0 0 1.5rem",
            lineHeight: 1.6,
          }}>
            Por favor completa todos los campos obligatorios antes de realizar tu pedido.
          </p>
          <button
            onClick={onClose}
            style={{
              background: "var(--color-coffee)",
              border: "1px solid var(--color-mocha)",
              borderRadius: "8px",
              padding: "0.6rem 1.75rem",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              color: "var(--color-text-primary)",
              width: "100%",
            }}
          >
            Entendido, volver al formulario
          </button>
        </div>
      </div>
    );
  }

  if (type === "success") {
    const firstName = name ? name.split(" ")[0] : "";
    return (
      <div
        style={overlayStyle}
        role="alertdialog"
        aria-modal="true"
        aria-label="Pedido exitoso"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div style={cardStyle}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--color-background-success, #D1FAE5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "var( --color-text)",
            margin: "0 0 0.5rem",
          }}>
            ¡Pedido confirmado!
          </p>
          <p style={{
            fontSize: "15px",
            color: "var(--color-mocha)",
            margin: "0 0 0.5rem",
            lineHeight: 1.6,
          }}>
            Gracias, <strong style={{ color: "var(--color-text)" }}>{firstName}</strong>. Tu pedido fue registrado correctamente.
          </p>
          {orderId && (
            <p style={{
              fontSize: "13px",
              color: "var(--color-text)",
              margin: "0 0 1.5rem",
            }}>
              Número de pedido:{" "}
              <span style={{
                fontWeight: 500,
                color: "var(--color-espresso)",
                fontFamily: "monospace",
              }}>
                #{orderId}
              </span>
            </p>
          )}
          <p style={{
            fontSize: "13px",
            color: "var(--color-espresso)",
            margin: "0 0 1.5rem",
            lineHeight: 1.5,
          }}>
            Te contactaremos pronto para confirmar los detalles.
          </p>
          <button
            onClick={onClose}
            style={{
              background: "#059669",
              border: "none",
              borderRadius: "8px",
              padding: "0.65rem 1.75rem",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              color: "#fff",
              width: "100%",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle cx="24" cy="24" r="20" stroke="var(--color-border-tertiary)" strokeWidth="4"/>
      <path d="M44 24a20 20 0 0 0-20-20" stroke="#059669" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Keyframe injection ───────────────────────────────────────────────────────
const modalStyles = `
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes spin { to { transform: rotate(360deg) } }
`;

// ─── Main component ───────────────────────────────────────────────────────────
export default function OrderForm({ cart }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [modal, setModal] = useState(null); // null | "loading" | "validation" | "success"
  const [orderResult, setOrderResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre completo.";
      valid = false;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un correo electrónico válido. Ejemplo: tu@correo.com";
      valid = false;
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Ingresa tu número de teléfono de contacto.";
      valid = false;
    }
    if (!form.date) {
      newErrors.date = "Selecciona la fecha en que deseas retirar tu pedido.";
      valid = false;
    }
    if (!form.quantity || Number(form.quantity) < 1) {
      newErrors.quantity = "Ingresa una cantidad válida (mínimo 1 persona).";
      valid = false;
    }
    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Selecciona un método de pago para continuar.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      setModal("validation");
      return;
    }

    setModal("loading");
    try {
      const result = await submitOrder({ ...form, cart });
      setOrderResult(result);
      setModal("success");
      setForm(initialForm);
    } catch (err) {
      setModal(null);
      setApiError(err.message);
    }
  };

  const closeModal = () => {
    setModal(null);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section className="order-form-section" id="pedido" aria-labelledby="order-title">
      <style>{modalStyles}</style>

      <Modal
        type={modal}
        name={form.name || orderResult?.name}
        orderId={orderResult?.orderId}
        onClose={closeModal}
      />

      <div className="order-form-section__header">
        <p className="section-pretitle">¿Listo para pedir?</p>
        <h2 className="section-title" id="order-title">Haz tu pedido</h2>
        <p className="section-subtitle">
          Completa el formulario y te confirmaremos tu pedido a la brevedad.
        </p>
      </div>

      <div className="order-form-wrapper">
        {apiError && (
          <div className="order-form__api-error" role="alert" aria-live="assertive">
            <span aria-hidden="true">⚠️</span>
            <p>{apiError}</p>
          </div>
        )}

        <form
          className="order-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulario de pedido"
        >
          {/* Nombre */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Nombre completo <span className="form-required" aria-label="Campo obligatorio">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? "form-input--error" : ""}`}
              value={form.name}
              onChange={handleChange}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
              placeholder="Ej: María González"
              autoComplete="name"
            />
            {errors.name && (
              <p className="form-error" id="name-error" role="alert">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Correo electrónico <span className="form-required" aria-label="Campo obligatorio">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? "form-input--error" : ""}`}
              value={form.email}
              onChange={handleChange}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              placeholder="Ej: maria@correo.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="form-error" id="email-error" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Teléfono de contacto <span className="form-required" aria-label="Campo obligatorio">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? "form-input--error" : ""}`}
              value={form.phone}
              onChange={handleChange}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              aria-invalid={!!errors.phone}
              placeholder="Ej: 3001234567"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="form-error" id="phone-error" role="alert">{errors.phone}</p>
            )}
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label" htmlFor="date">
              Fecha de retiro o entrega <span className="form-required" aria-label="Campo obligatorio">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className={`form-input ${errors.date ? "form-input--error" : ""}`}
              value={form.date}
              onChange={handleChange}
              min={todayStr}
              aria-describedby={errors.date ? "date-error" : undefined}
              aria-invalid={!!errors.date}
            />
            {errors.date && (
              <p className="form-error" id="date-error" role="alert">{errors.date}</p>
            )}
          </div>

          {/* Cantidad */}
          <div className="form-group">
            <label className="form-label" htmlFor="quantity">
              Número de personas <span className="form-required" aria-label="Campo obligatorio">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className={`form-input ${errors.quantity ? "form-input--error" : ""}`}
              value={form.quantity}
              onChange={handleChange}
              min="1"
              max="50"
              placeholder="Ej: 2"
              aria-describedby={errors.quantity ? "quantity-error" : undefined}
              aria-invalid={!!errors.quantity}
            />
            {errors.quantity && (
              <p className="form-error" id="quantity-error" role="alert">{errors.quantity}</p>
            )}
          </div>

          {/* Método de pago */}
          <div className="form-group">
            <label className="form-label" htmlFor="paymentMethod">
              Método de pago <span className="form-required" aria-label="Campo obligatorio">*</span>
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              className={`form-input form-select ${errors.paymentMethod ? "form-input--error" : ""}`}
              value={form.paymentMethod}
              onChange={handleChange}
              aria-describedby={errors.paymentMethod ? "payment-error" : undefined}
              aria-invalid={!!errors.paymentMethod}
            >
              <option value="">Selecciona una opción</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
            {errors.paymentMethod && (
              <p className="form-error" id="payment-error" role="alert">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Notas */}
          <div className="form-group form-group--full">
            <label className="form-label" htmlFor="notes">
              Notas adicionales <span className="form-optional">(opcional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-input form-textarea"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Alergias, preferencias, indicaciones especiales..."
            />
          </div>

          {/* Carrito resumen */}
          {cart.length > 0 && (
            <div className="form-group form-group--full">
              <p className="form-label">Resumen de tu carrito</p>
              <ul className="order-form__cart-summary" aria-label="Productos en el carrito">
                {cart.map((item) => (
                  <li key={item.id} className="order-form__cart-item">
                    <span>{item.name}</span>
                    <span>× {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-group form-group--full">
            <button
              type="submit"
              className="btn btn--primary btn--large"
              disabled={modal === "loading"}
              aria-busy={modal === "loading"}
            >
              {modal === "loading" ? "Procesando pedido..." : "Confirmar pedido"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}