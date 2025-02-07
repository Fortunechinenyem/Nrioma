import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => {
        const sameId = cartItem.id === item.id;
        const sameCustomizations =
          (!cartItem.customizations && !item.customizations) ||
          JSON.stringify(cartItem.customizations) ===
            JSON.stringify(item.customizations);
        return sameId && sameCustomizations;
      });

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id &&
            JSON.stringify(cartItem.customizations) ===
              JSON.stringify(item.customizations)
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  increaseQuantity: (id, customizations) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (id, customizations) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id &&
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  removeFromCart: (id, customizations) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) =>
          !(
            item.id === id &&
            JSON.stringify(item.customizations) ===
              JSON.stringify(customizations)
          )
      ),
    })),

  clearCart: () => set({ cart: [] }),

  total: 0,

  calculateTotal: () =>
    set((state) => ({
      total: state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    })),
}));
