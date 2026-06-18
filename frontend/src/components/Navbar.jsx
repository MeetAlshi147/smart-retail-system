import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(query)}`)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-orange-400 shrink-0">
          Smart<span className="text-white">Retail</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full rounded-md py-2 pl-4 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
              <Search size={20} />
            </button>
          </div>
        </form>

        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link to="/" className="hover:text-orange-400 transition-colors font-medium">Home</Link>
          <Link to="/products" className="hover:text-orange-400 transition-colors font-medium">Products</Link>
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-orange-400 transition-colors font-medium">
            <ShoppingCart size={20} />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md py-2 px-3 text-slate-900 focus:outline-none"
            />
          </form>
          <Link to="/" onClick={() => setMenuOpen(false)} className="font-medium">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="font-medium">Products</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="font-medium">
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      )}
    </header>
  )
}
