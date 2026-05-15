// src/components/Navbar.jsx
import { useState } from "react";

export default function Navbar({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Navegación principal">
        <a href="#inicio" className="navbar__brand" onClick={(e) => { e.preventDefault(); scrollTo("inicio"); }}>
          <span className="navbar__logo">☕</span>
          <span className="navbar__name">Café Santara</span>
        </a>

        <button
          className="navbar__hamburger"
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`} role="list">
          <li><button onClick={() => scrollTo("inicio")}>Inicio</button></li>
          <li><button onClick={() => scrollTo("catalogo")}>Menú</button></li>
          <li><button onClick={() => scrollTo("pedido")}>Pedido</button></li>
          <li><button onClick={() => scrollTo("contacto")}>Contacto</button></li>
        </ul>

        <button className="navbar__cart-btn" onClick={onCartOpen} aria-label={`Ver carrito, ${cartCount} productos`}>
          🛒
          {cartCount > 0 && (
            <span className="navbar__cart-badge">{cartCount}</span>
          )}
        </button>
      </nav>
    </header>
  );
}
