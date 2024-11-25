'use client'
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the cart item
interface CartItem {
  course: { _id: string; title: string; price: number; thumbnail: string };
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  fetchCartItems: () => void;
  deleteFromCart: (courseId: string) => void;
}

// Define the CartProvider props to accept children
interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/get-cart-items');
      const data = response?.data;
      if (data?.success) {
        setCartItems(data?.cart);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const deleteFromCart = async (courseId: string) => {
    try {
      const response = await axios.delete('/api/delete-from-cart', {
        params: { courseId },
      });
      if (response.status === 200) {
        setCartItems(response.data.cart);
      } else {
        console.error('Error deleting from cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error in deleteFromCart:', error);
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + (item?.quantity || 1), 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.course?.price * (item?.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        fetchCartItems,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
