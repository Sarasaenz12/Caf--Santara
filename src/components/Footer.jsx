// src/components/Footer.jsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer" id="contacto">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">☕</span>
          <h3 className="footer__brand-name">Café Santara</h3>
          <p className="footer__tagline">Donde cada sorbo cuenta una historia.</p>
          <div className="footer__socials" aria-label="Redes sociales">
            <a href="#" aria-label="Instagram de Café Santara" className="footer__social-link">📸</a>
            <a href="#" aria-label="Facebook de Café Santara" className="footer__social-link">📘</a>
            <a href="#" aria-label="WhatsApp de Café Santara" className="footer__social-link">💬</a>
          </div>
        </div>

        <div className="footer__links">
          <h3 className="footer__section-title">Navegación</h3>
          <ul role="list">
            <li><button onClick={() => scrollTo("inicio")}>Inicio</button></li>
            <li><button onClick={() => scrollTo("catalogo")}>Nuestro menú</button></li>
            <li><button onClick={() => scrollTo("pedido")}>Hacer un pedido</button></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h3 className="footer__section-title">Contáctanos</h3>
          <address>
            <p>📍 Calle del Café 42, Armenia, Quindío</p>
            <p>📞 <a href="tel:+573001234567">+57 300 123 4567</a></p>
            <p>✉️ <a href="mailto:hola@cafesantara.co">hola@cafesantara.co</a></p>
          </address>
        </div>

        <div className="footer__hours">
          <h3 className="footer__section-title">Horario</h3>
          <dl>
            <div className="footer__hour-row">
              <dt>Lunes – Viernes</dt>
              <dd>7:00 am – 8:00 pm</dd>
            </div>
            <div className="footer__hour-row">
              <dt>Sábado</dt>
              <dd>8:00 am – 7:00 pm</dd>
            </div>
            <div className="footer__hour-row">
              <dt>Domingo</dt>
              <dd>9:00 am – 5:00 pm</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {currentYear} Café Santara. Todos los derechos reservados.</p>
        <p>Hecho con ☕ y mucho amor artesanal.</p>
      </div>
    </footer>
  );
}