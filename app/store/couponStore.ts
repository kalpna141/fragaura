import { create } from "zustand";

export interface Coupon {
  code: string;
  type: "percentage" | "fixed" | "b2g1" | "b3g1";
  value: number;
  description: string;
  minPurchase: number;
  maxDiscount: number;
}

interface CouponState {
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number, itemCount: number) => number;
}

export const useCouponStore = create<CouponState>((set, get) => ({
  appliedCoupon: null,

  applyCoupon: (coupon) => set({ appliedCoupon: coupon }),

  removeCoupon: () => set({ appliedCoupon: null }),

  calculateDiscount: (subtotal, itemCount) => {
    const { appliedCoupon } = get();
    if (!appliedCoupon) return 0;

    // Check minimum purchase
    if (subtotal < appliedCoupon.minPurchase) return 0;

    switch (appliedCoupon.type) {
      case "percentage": {
        const discount = (subtotal * appliedCoupon.value) / 100;
        return Math.min(discount, appliedCoupon.maxDiscount);
      }
      case "fixed":
        return Math.min(appliedCoupon.value, subtotal);
      case "b2g1": {
        // For every 2 items, get 1 free (discount = cheapest item price)
        // This is simplified - in production you'd calculate based on actual item prices
        const freeItems = Math.floor(itemCount / 3);
        return freeItems * (subtotal / itemCount); // Average item price
      }
      case "b3g1": {
        // For every 3 items, get 1 free
        const freeItems = Math.floor(itemCount / 4);
        return freeItems * (subtotal / itemCount);
      }
      default:
        return 0;
    }
  },
}));
