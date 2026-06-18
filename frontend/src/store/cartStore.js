import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id)
    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({ cart: [...get().cart, { ...product, quantity: 1 }] })
    }
  },

  removeFromCart: (id) => {
    set({ cart: get().cart.filter((item) => item.id !== id) })
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })
  },

  clearCart: () => set({ cart: [] }),

  getTotal: () => {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getItemCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0)
  },
}))
