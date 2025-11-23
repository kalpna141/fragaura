# Kalpna Attar - Deployment Instructions

## Environment Variables Required

Create a `.env.local` file in the root directory with:

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Build and Run

```bash
# Install dependencies
npm install

# Seed the database
npm run seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features Implemented

### User-Facing Features
✅ Sky blue gradient theme throughout
✅ Product images with multiple views (3 images per product)
✅ Wishlist functionality with heart icon
✅ Save for later in cart
✅ Mobile responsive hamburger menu with animations
✅ Animated product cards with 360° image rotation on hover
✅ Login/Logout functionality (UI ready)
✅ Auth pages without footer
✅ Product detail page with image carousel and thumbnails
✅ QR code payment integration for UPI
✅ Enhanced animations on homepage
✅ Sticky footer
✅ Unique logo with sparkles animation
✅ Cart quantity tracking - shows current items in cart on product page
✅ Dynamic cart updates with proper quantity accumulation
✅ Category pages with animations and filtering
✅ Coupon/Promo code functionality (WELCOME10, FLAT200, B2G1FREE)
✅ Order success page with confetti animation
✅ Order failed page with retry options
✅ Multiple payment methods (COD, UPI, Card)

### Admin Panel Features
✅ Complete admin dashboard with sidebar navigation
✅ Dashboard stats cards (Total Users, Products, Revenue, Products Sold)
✅ User management section with search functionality
✅ Product management with search, view, edit, delete
✅ Order management with status tracking and filtering
✅ Coupon management (create, edit, delete coupons)
✅ Support for multiple coupon types:
   - Percentage discount
   - Fixed amount discount
   - Buy 2 Get 1 Free
   - Buy 3 Get 1 Free
✅ Mobile responsive admin panel

## Admin Access

Access the admin panel at: `/admin`

Admin panel includes:
- Dashboard: `/admin`
- Users: `/admin/users`
- Products: `/admin/products`
- Orders: `/admin/orders`
- Coupons: `/admin/coupons`

## Payment Details

UPI ID: kalpnathakur141@oksbi
(Change in /app/payment/page.tsx line 116)

## Available Coupons

Users can apply these coupons at checkout:
- `WELCOME10` - 10% off on orders above ₹500 (max discount ₹200)
- `FLAT200` - Flat ₹200 off on orders above ₹1000
- `B2G1FREE` - Buy 2 Get 1 Free

## Order Flow

1. Browse products → Add to cart
2. View cart → Proceed to checkout
3. Enter shipping details
4. Select payment method
5. Apply coupon (optional)
6. Place order
7. Complete payment
8. Redirected to success/failed page

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Confetti**: canvas-confetti

## Notes

- All pages are mobile responsive
- Animations use Framer Motion
- State management with Zustand
- Product images from Unsplash
- Cart and wishlist data persist in localStorage
- Coupon discounts calculated dynamically
- Order confirmation pages with animations
