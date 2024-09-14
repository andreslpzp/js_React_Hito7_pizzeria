import React, { useState, useEffect, useContext } from 'react';
import CardPizza from '../Components/CardPizza';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';  // Importamos UserContext
import '../assets/CSS/Cart.css';

const Cart = () => {
  const [pizzas, setPizzas] = useState([]);
  const { cart, removeFromCart, addToCart, totalPrice } = useContext(CartContext);
  const { token } = useContext(UserContext);  // Obtenemos el token del UserContext

  // Fetch pizzas from the API
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/pizzas/');
        if (!response.ok) {
          throw new Error('Error fetching pizzas');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPizzas();
  }, []);

  const handleQuantityChange = (pizzaId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(pizzaId);
    } else {
      const pizza = pizzas.find((p) => p.id === pizzaId);
      if (pizza) {
        addToCart({ ...pizza, quantity: newQuantity });
      }
    }
  };

  return (
    <div className="cart">
      <h1 className="titulo">Tu carrito de compras</h1>
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            pizza={pizza}
            quantity={cart.find(item => item.id === pizza.id)?.quantity || 0}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <div className="seccion_pago">
        <h2>Tu pedido:</h2>
        <ul>
          {cart.map((pizza) => (
            <li key={pizza.id}>{pizza.name}: {pizza.quantity}</li>
          ))}
        </ul>

        <h3>Total a pagar: ${totalPrice.toFixed(2)}</h3>
        <button className="boton_pago" disabled={!token}> {/* Deshabilitamos el botón si no hay token */}
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;








