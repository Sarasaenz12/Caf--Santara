// src/components/Catalog.jsx
import { useState, useEffect } from "react";
import { getProducts } from "../api/v1/mockApi";

const CATEGORY_LABELS = {
  bebidas: "Bebidas",
  alimentos: "Alimentos",
  combos: "Combos",
};

export default function Catalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [addedIds, setAddedIds] = useState(new Set());

  const loadProducts = () => {
    setLoading(true);
    setError(null);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedIds((prev) => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1200);
  };

  const categories = ["todos", ...new Set(products.map((p) => p.category))];

  const filtered =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

  return (
    <section className="catalog" id="catalogo" aria-labelledby="catalog-title">
      <div className="catalog__header">
        <p className="section-pretitle">Lo que ofrecemos</p>
        <h2 className="section-title" id="catalog-title">Nuestro menú</h2>
        <p className="section-subtitle">
          Todo preparado con ingredientes de primera calidad y mucho amor artesanal.
        </p>
      </div>

      {loading && (
        <div className="catalog__loading" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <p>Cargando el menú...</p>
        </div>
      )}

      {error && !loading && (
        <div className="catalog__error" role="alert">
          <span className="catalog__error-icon" aria-hidden="true">⚠️</span>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={loadProducts}>
            Reintentar carga del menú
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="catalog__filters" role="group" aria-label="Filtrar por categoría">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`catalog__filter-btn ${activeCategory === cat ? "catalog__filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat === "todos" ? "Todos" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>

          <div className="catalog__grid" role="list" aria-label="Productos del catálogo">
            {filtered.map((product) => (
              <article key={product.id} className="product-card" role="listitem">
                <div className="product-card__image-wrapper">
                  <img
                    src={product.image}
                    alt={`Imagen de ${product.name}`}
                    className="product-card__image"
                    loading="lazy"
                  />
                  <span className="product-card__category-badge">
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                </div>
                <div className="product-card__body">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__footer">
                    <span className="product-card__price">{formatPrice(product.price)}</span>
                    <button
                      className={`btn btn--small ${addedIds.has(product.id) ? "btn--success" : "btn--primary"}`}
                      onClick={() => handleAdd(product)}
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      {addedIds.has(product.id) ? "✓ Agregado" : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
