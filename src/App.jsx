import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // -------------------
  // CART LOGIC (igual)
  // -------------------
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Hero />} />

        <Route
          path="/catalog"
          element={<Catalog onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              items={cartItems}
              onRemove={handleRemoveFromCart}
              onClear={handleClearCart}
              onUpdateQty={handleUpdateQty}
            />
          }
        />

        <Route
          path="/order"
          element={
            <OrderForm
              cart={cartItems}
              onClear={handleClearCart}
            />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}