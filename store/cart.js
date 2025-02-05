import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  total: 0,
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
      total: state.total + item.price,
    })),
  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      const newTotal = newCart.reduce((sum, item) => sum + item.price, 0);
      return { cart: newCart, total: newTotal };
    }),
  clearCart: () => set({ cart: [], total: 0 }),
}));
