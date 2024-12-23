import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    id: 1,
    name: 'Spring Rolls',
    category: 'Starters',
    image: 'https://th.bing.com/th/id/OIP.8DIyqP6V7UStxgaG3OokAgHaE7?w=279&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Crispy spring rolls stuffed with vegetables.',
    price: 5.99,
    dietary: ['Vegan', 'Gluten-Free']
  },
  {
    id: 2,
    name: 'Cheese Burger',
    category: 'Main Course',
    image: 'https://th.bing.com/th/id/OIP.WHcsWJ3nA-gB-m9dIBOdjwHaE8?rs=1&pid=ImgDetMain', 
    description: 'Juicy burger with cheddar cheese and fresh lettuce.',
    price: 8.99,
    dietary: ['Vegetarian']
  },
  {
    id: 3,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    image: 'https://th.bing.com/th/id/OIP.FTVpN8q580hatJnXQlxXFgHaFL?w=202&h=141&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Warm chocolate cake with molten fudge inside.',
    price: 6.99,
    dietary: ['Gluten-Free']
  },
  {
    id: 4,
    name: 'Grilled Chicken',
    category: 'Main Course',
    image: 'https://thumbs.dreamstime.com/z/elegant-chicken-12353828.jpg',
    description: 'Tender grilled chicken with herbs and spices.',
    price: 10.99,
    dietary: ['Gluten-Free']
  },
  {
    id: 5,
    name: 'Vegetable Soup',
    category: 'Starters',
    image: 'https://th.bing.com/th/id/OIP.dhImyPw0h9AeJO4FXyUOqAHaD4?w=322&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Healthy vegetable soup with a mix of fresh seasonal veggies.',
    price: 4.99,
    dietary: ['Vegan', 'Gluten-Free']
  },
  {
    id: 6,
    name: 'Pasta Primavera',
    category: 'Main Course',
    image: 'https://th.bing.com/th/id/OIP.dhImyPw0h9AeJO4FXyUOqAHaD4?w=322&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Pasta tossed in a light garlic and olive oil sauce with fresh vegetables.',
    price: 9.99,
    dietary: ['Vegetarian']
  },
  {
    id: 7,
    name: 'Cheesecake',
    category: 'Desserts',
    image: 'https://th.bing.com/th/id/OIP.l-haH1InJJn3ziwYC7sOdwHaEp?w=271&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'Classic cheesecake with a graham cracker crust and a creamy filling.',
    price: 7.99,
    dietary: ['Vegetarian']
  },
  {
    id: 8,
    name: 'Fish Tacos',
    category: 'Main Course',
    image: 'https://th.bing.com/th/id/OIP.l-haH1InJJn3ziwYC7sOdwHaEp?w=271&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Soft corn tortillas with grilled fish, slaw, and a tangy sauce.',
    price: 12.99,
    dietary: ['Gluten-Free']
  },
  {
    id: 9,
    name: 'Mango Sticky Rice',
    category: 'Desserts',
    image: 'https://th.bing.com/th/id/OIP.q_SCylMc_OnbzLNIq6cafQHaE7?w=290&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Sweet sticky rice topped with fresh mango slices and coconut milk.',
    price: 5.49,
    dietary: ['Vegan', 'Gluten-Free']
  },
  {
    id: 10,
    name: 'Falafel Wrap',
    category: 'Starters',
    image: 'https://th.bing.com/th/id/OIP.q_SCylMc_OnbzLNIq6cafQHaE7?w=290&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Falafel balls wrapped in pita with tahini, lettuce, and tomatoes.',
    price: 6.49,
    dietary: ['Vegetarian']
  },
  {
    id: 11,
    name: 'BBQ Ribs',
    category: 'Main Course',
    image: 'https://th.bing.com/th/id/OIP.ltASYa80zFtaZ6BOR3fxzgHaE8?w=297&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Succulent ribs grilled with a smoky BBQ sauce.',
    price: 14.99,
    dietary: ['Gluten-Free']
  },
  {
    id: 12,
    name: 'Tiramisu',
    category: 'Desserts',
    image: 'https://th.bing.com/th/id/OIP.YuuO44OtLmY8iSeRQuResQHaLJ?w=202&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
    price: 6.49,
    dietary: ['Vegetarian']
  }
];

const Menu = () => {
    const { addToCart } = useCart();
    
    const [quantities, setQuantities] = useState(
      menuItems.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {})
    );
  
    const [addedToCartNotification, setAddedToCartNotification] = useState(false);
  
    const handleQuantityChange = (itemId, operation) => {
      setQuantities(prevQuantities => {
        const newQuantity = operation === 'increment' ? prevQuantities[itemId] + 1 : prevQuantities[itemId] - 1;
        return {
          ...prevQuantities,
          [itemId]: newQuantity < 1 ? 1 : newQuantity, 
        };
      });
    };
  
    const handleAddToCart = (item) => {
      const cartItem = { ...item, quantity: quantities[item.id] };
      addToCart(cartItem);
      setAddedToCartNotification(true);
      setTimeout(() => {
        setAddedToCartNotification(false);
      }, 3000);
    };
  
    return (
      <div className="menu-container">
        <div className="navbar-spacer"></div>
        <h1>Menu</h1>
  
        {addedToCartNotification && (
          <div className="toast-notification">Added to Cart</div>
        )}
  
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
  
              <div className="quantity-selector">
                <label>Quantity:</label>
                <button onClick={() => handleQuantityChange(item.id, 'decrement')}>-</button>
                <span>{quantities[item.id]}</span>
                <button onClick={() => handleQuantityChange(item.id, 'increment')}>+</button>
              </div>
  
              <Link to={`/order-cust/${item.id}?quantity=${quantities[item.id]}`} className="customize-button">
                Customize
              </Link>
  
              <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Menu;