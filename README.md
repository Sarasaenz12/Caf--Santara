# ☕ Café Santara

Aplicación web desarrollada en React que simula el sistema de pedidos de una cafetería artesanal.
Permite visualizar un catálogo de productos, agregar elementos a un carrito y realizar pedidos mediante un formulario con validaciones.

---

## 🚀 Tecnologías utilizadas

* React 18 + Vite
* JavaScript (ES6+)
* CSS (Responsive con Flexbox/Grid)
* Mock API (simulación de backend)

---

## 📦 Instalación y ejecución local

### 🔧 Requisitos

* Node.js 18 o superior
* npm

### ▶️ Pasos para ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/cafe-santara.git

# 2. Entrar a la carpeta del proyecto
cd cafe-santara

# 3. Instalar dependencias
npm install

# 4. Ejecutar el proyecto
npm run dev
```

### 🌐 URL local

```
http://localhost:5173/
```

---

## 📁 Estructura del proyecto

```
src/
│
├── components/
│   ├── Hero.jsx
│   ├── Catalog.jsx
│   ├── OrderForm.jsx
│   ├── Cart.jsx
│   ├── Footer.jsx
│   └── Navbar.jsx
│
├── mockApi.js
├── App.jsx
├── main.jsx
├── index.css
```

---

## 🧠 Funcionalidades principales

* 📌 Landing page con presentación del café
* ☕ Catálogo de productos dinámico
* 🛒 Carrito de compras con total acumulado
* ❌ Vaciado de carrito con confirmación
* 📡 Consumo de API simulada (GET y POST)
* 📝 Formulario de pedido con validaciones
* ⚠️ Manejo de errores y estados de carga
* 📱 Diseño responsivo (móvil y escritorio)

---

## 🔌 API simulada (mockApi.js)

| Función     | Método HTTP | URL equivalente | Parámetros | Respuesta exitosa                   | Respuesta en error                                                          |
| ----------- | ----------- | --------------- | ---------- | ----------------------------------- | --------------------------------------------------------------------------- |
| getProducts | GET         | /api/products   | Ninguno    | Array de productos                  | "No pudimos cargar el menú. Intenta recargar la página."                    |
| submitOrder | POST        | /api/orders     | orderData  | { success: true, orderId, message } | "No pudimos procesar tu pedido. Verifica tu conexión e inténtalo de nuevo." |

---

## ⏱ Simulación de red

* GET productos: 800ms
* POST pedido: 1200ms
* Probabilidad de error:

  * GET: 10%
  * POST: 20%

---

## 🎯 Requisitos del parcial cumplidos

✔ Uso de etiquetas semánticas (header, main, section, article, footer)
✔ Jerarquía correcta de encabezados (h1, h2, h3)
✔ Formulario con labels y validaciones
✔ Diseño responsivo (mobile + desktop)
✔ Botones con texto claro
✔ Estados de carga visibles
✔ Confirmación de acciones irreversibles
✔ Estado vacío del carrito
✔ API simulada con manejo de éxito y error
✔ Código organizado y modular

---

## 👩‍💻 Autores

* Sara Sanchez
* Santiago Cabezas Paz

---

## 📌 Notas

Este proyecto fue desarrollado como parte del parcial de la asignatura **Programación con Tecnologías Web**, enfocado en buenas prácticas de frontend, usabilidad y consumo de APIs simuladas.

---
