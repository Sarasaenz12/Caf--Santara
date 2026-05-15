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

export default function OrderForm({ cart }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
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
    setSuccessMsg(null);
    setApiError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await submitOrder({ ...form, cart });
      setSuccessMsg(
        `¡Gracias, ${form.name.split(" ")[0]}! Tu pedido fue registrado con el número ${result.orderId}. Te contactaremos pronto.`
      );
      setForm(initialForm);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section className="order-form-section" id="pedido" aria-labelledby="order-title">
      <div className="order-form-section__header">
        <p className="section-pretitle">¿Listo para pedir?</p>
        <h2 className="section-title" id="order-title">Haz tu pedido</h2>
        <p className="section-subtitle">
          Completa el formulario y te confirmaremos tu pedido a la brevedad.
        </p>
      </div>

      <div className="order-form-wrapper">
        {successMsg && (
          <div className="order-form__success" role="alert" aria-live="polite">
            <span aria-hidden="true">🎉</span>
            <p>{successMsg}</p>
          </div>
        )}

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
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Procesando pedido..." : "Confirmar pedido"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}