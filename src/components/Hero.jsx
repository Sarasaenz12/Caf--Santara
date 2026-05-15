// src/components/Hero.jsx
export default function Hero() {
  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="inicio" aria-label="Presentación de Café Santara">
      <div className="hero__bg-pattern" aria-hidden="true"></div>

      <div className="hero__content">
        <p className="hero__pretitle">Bienvenido a</p>
        <h1 className="hero__title">Café Santara</h1>
        <p className="hero__slogan">Donde cada sorbo cuenta una historia.</p>
        <p className="hero__description">
          Cafetería artesanal en el corazón de la ciudad. Granos de origen único,
          recetas de la casa y el ambiente más acogedor para empezar tu día con el
          pie derecho — o simplemente hacer una pausa.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={scrollToCatalog}>
            Ver nuestro menú
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" })}
          >
            Hacer un pedido
          </button>
        </div>

        <div className="hero__badges" aria-label="Características de Café Santara">
          <span className="hero__badge">🌱 Origen sostenible</span>
          <span className="hero__badge">🍞 Horneado diario</span>
          <span className="hero__badge">☕ Tostado artesanal</span>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__cup-wrapper">
          <div className="hero__cup">
            <div className="hero__steam">
              <span></span><span></span><span></span>
            </div>
            <div className="hero__cup-body">☕</div>
          </div>
          <div className="hero__circle hero__circle--1"></div>
          <div className="hero__circle hero__circle--2"></div>
          <div className="hero__circle hero__circle--3"></div>
        </div>
      </div>
    </section>
  );
}
