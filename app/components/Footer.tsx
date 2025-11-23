export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sky-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-2 text-sky-700"> Fragaura</h3>
          <p className="text-sky-600">Luxury attars crafted for your signature aura.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-sky-700">Links</h3>
          <ul className="space-y-1 text-sky-600">
            <li><a href="/shop" className="hover:text-sky-500 transition-colors">Shop</a></li>
            <li><a href="/cart" className="hover:text-sky-500 transition-colors">Cart</a></li>
            <li><a href="/checkout" className="hover:text-sky-500 transition-colors">Checkout</a></li>
          </ul>
        </div>
        <div id="contact">
          <h3 className="font-semibold mb-2 text-sky-700">Contact</h3>
          <p className="text-sky-600">WhatsApp: +91-8626881161</p>
          <p className="text-sky-600">Instagram: @kalpnaattar</p>
        </div>
      </div>
    </footer>
  );
}
