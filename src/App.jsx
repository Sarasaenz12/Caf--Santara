import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Catalog onAddToCart={handleAddToCart} />
        <OrderForm cart={cartItems} onClear={handleClearCart} />
      </main>

      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        onUpdateQty={handleUpdateQty}
        onClose={() => setCartOpen(false)}
        isOpen={cartOpen}
      />

      <Footer />
    </>
  );
}