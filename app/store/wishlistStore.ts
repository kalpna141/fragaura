import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

type WishlistStore = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
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
      isInWishlist: (id) => {
        return get().items.some((i) => i._id === id);
      },
      clear: () => set({ items: [] }),
    }),
    { name: "wishlist-storage" }
  )
);
