// src/components/Cart.jsx

export default function Cart({ items, onRemove, onUpdateQty, onClear, onClose, isOpen }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClear = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas vaciar el carrito? Esta acción no se puede deshacer."
    );
    if (confirmed) onClear();
  };

  const scrollToOrder = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`cart ${isOpen ? "cart--open" : ""}`}
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
        role="complementary"
      >
        <div className="cart__header">
          <h2 className="cart__title">
            Tu carrito{" "}
            {totalItems > 0 && (
              <span className="cart__count">{totalItems}</span>
            )}
          </h2>
          <button className="cart__close" onClick={onClose} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        <div className="cart__body">
          {items.length === 0 ? (
            <div className="cart__empty" role="status">
              <span className="cart__empty-icon" aria-hidden="true">🛒</span>
              <p>Tu carrito está vacío. ¡Agrega algo delicioso!</p>
              <button className="btn btn--ghost" onClick={onClose}>
                Ver nuestro menú
              </button>
            </div>
          ) : (
            <ul className="cart__list" role="list">
              {items.map((item) => (
                <li key={item.id} className="cart__item" role="listitem">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart__item-img"
                  />
                  <div className="cart__item-info">
                    <p className="cart__item-name">{item.name}</p>
                    <p className="cart__item-price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="cart__item-controls">
                    <button
                      className="cart__qty-btn"
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      aria-label={`Reducir cantidad de ${item.name}`}
                    >
                      −
                    </button>
                    <span className="cart__qty" aria-label={`Cantidad: ${item.quantity}`}>
                      {item.quantity}
                    </span>
                    <button
                      className="cart__qty-btn"
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      className="cart__remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Eliminar ${item.name} del carrito`}
                    >
                      🗑
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart__footer">
            <div className="cart__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button className="btn btn--primary cart__checkout-btn" onClick={scrollToOrder}>
              Ir a confirmar pedido
            </button>
            <button className="btn btn--danger" onClick={handleClear}>
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
