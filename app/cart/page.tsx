"use client";
import { useCartStore } from "@/app/store/cartStore";
import { useSavedForLaterStore } from "@/app/store/savedForLaterStore";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, incQty, decQty, removeItem } = useCartStore();
  const { items: savedItems, addItem: saveItem, removeItem: removeSavedItem, moveToCart } = useSavedForLaterStore();

  const subtotal = items.reduce((a,b)=>a+b.price*b.qty,0);
  const shipping = items.length ? 50 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-700">YOUR CART</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">

        {/* LEFT SIDE - CART ITEMS AND SAVED */}
        <div className="space-y-6">
          {/* CART ITEMS */}
          <section className="space-y-4">
            {items.map(i=>(
              <div key={i._id} className="bg-white border-2 border-sky-200 rounded-2xl p-4 flex gap-4 shadow-sm">
                <img src={i.image} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sky-900">{i.name}</h3>
                  <p className="text-sm text-sky-700 font-medium">₹{i.price}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={()=>decQty(i._id)} className="px-3 py-1 border-2 border-sky-300 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors">-</button>
                    <span className="text-sky-900 font-medium">{i.qty}</span>
                    <button onClick={()=>incQty(i._id)} className="px-3 py-1 border-2 border-sky-300 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors">+</button>
                  </div>

                  <div className="mt-2 flex gap-3 text-sm">
                    <button onClick={()=>removeItem(i._id)} className="text-sky-600 hover:text-sky-500 underline">Remove</button>
                    <button
                      onClick={() => {
                        saveItem(i);
                        removeItem(i._id);
                      }}
                      className="underline text-sky-500 hover:text-sky-400"
                    >
                      Save for later
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!items.length && <p className="text-center text-sky-600">Cart is empty.</p>}
          </section>

          {/* SAVED FOR LATER */}
          {savedItems.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-sky-700">Saved for Later</h2>
              <div className="space-y-4">
                {savedItems.map(i => (
                  <motion.div
                    key={i._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border-2 border-sky-200 rounded-2xl p-4 flex gap-4"
                  >
                    <img src={i.image} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sky-900">{i.name}</h3>
                      <p className="text-sm text-sky-700 font-medium">₹{i.price}</p>
                      <div className="mt-2 flex gap-2 text-sm">
                        <button
                          onClick={() => {
                            const item = moveToCart(i._id);
                            if (item) {
                              for (let j = 0; j < item.qty; j++) {
                                useCartStore.getState().addItem({
                                  _id: item._id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image
                                });
                              }
                            }
                          }}
                          className="text-white bg-sky-500 hover:bg-sky-600 px-3 py-1 rounded-lg transition-colors"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeSavedItem(i._id)}
                          className="text-sky-600 hover:text-sky-500 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ORDER SUMMARY RIGHT */}
        <aside className="bg-white border-2 border-sky-200 rounded-2xl p-4 h-fit md:sticky md:top-20 shadow-md">
          <h3 className="font-bold mb-3 text-sky-700 text-lg">ORDER SUMMARY</h3>
          <div className="text-sm space-y-2 text-sky-900">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">₹{subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-medium">₹{shipping}</span></div>
            <div className="flex justify-between"><span>Tax</span><span className="font-medium">₹{tax}</span></div>
            <hr className="border-sky-200" />
            <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{total}</span></div>
          </div>

          <a href="/checkout" className="block text-center bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-2 mt-4 font-medium transition-colors">
            PROCEED TO CHECKOUT
          </a>
        </aside>
      </div>
    </div>
  );
}
