import { create } from "zustand";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (_id: string) => void;
  incQty: (_id: string) => void;
  decQty: (_id: string) => void;
  getItemQty: (_id: string) => number;
  clear: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const found = items.find(i => i._id === item._id);
    if (found) {
      set({ items: items.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i) });
    } else {
      set({ items: [...items, { ...item, qty: 1 }] });
    }
  },
  removeItem: (_id) => set({ items: get().items.filter(i => i._id !== _id) }),
  incQty: (_id) => set({ items: get().items.map(i => i._id === _id ? { ...i, qty: i.qty + 1 } : i) }),
  decQty: (_id) => set({
    items: get().items
      .map(i => i._id === _id ? { ...i, qty: i.qty - 1 } : i)
      .filter(i => i.qty > 0)
  }),
  getItemQty: (_id) => {
    const found = get().items.find(i => i._id === _id);
    return found ? found.qty : 0;
  },
  clear: () => set({ items: [] }),
}));
