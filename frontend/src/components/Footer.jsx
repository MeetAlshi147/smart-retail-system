import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-orange-400 mb-3">SmartRetail</h3>
          <p className="text-sm text-slate-400">
            Your one-stop shop for the latest electronics, gadgets and accessories — powered by
            cloud analytics.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-orange-400">All Products</Link></li>
            <li><Link to="/products?category=Laptops" className="hover:text-orange-400">Laptops</Link></li>
            <li><Link to="/products?category=Smartphones" className="hover:text-orange-400">Smartphones</Link></li>
            <li><Link to="/products?category=Headphones" className="hover:text-orange-400">Headphones</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cart" className="hover:text-orange-400">My Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-orange-400">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">About</h4>
          <p className="text-sm text-slate-400">
            Built as part of the Smart Retail Analytics Platform — an event-driven architecture
            project on Google Cloud Platform.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-700 text-center text-xs text-slate-500 py-4">
        © {new Date().getFullYear()} SmartRetail. All rights reserved.
      </div>
    </footer>
  )
}
