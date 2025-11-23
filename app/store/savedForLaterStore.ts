import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type SavedForLaterStore = {
  items: SavedItem[];
  addItem: (item: SavedItem) => void;
  removeItem: (id: string) => void;
  moveToCart: (id: string) => SavedItem | undefined;
};

export const useSavedForLaterStore = create<SavedForLaterStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exists = get().items.find((i) => i._id === item._id);
        if (!exists) {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },
      moveToCart: (id) => {
        const item = get().items.find((i) => i._id === id);
        if (item) {
          set({ items: get().items.filter((i) => i._id !== id) });
          return item;
        }
      },
    }),
    { name: "saved-for-later-storage" }
  )
);
