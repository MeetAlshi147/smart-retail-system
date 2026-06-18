import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import { products, categories } from '../data/products'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setCategory(searchParams.get('category') || 'All')
  }, [searchParams])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    const params = new URLSearchParams(searchParams)
    if (cat === 'All') params.delete('category')
    else params.set('category', cat)
    setSearchParams(params)
  }

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearch(val)
    const params = new URLSearchParams(searchParams)
    if (val) params.set('search', val)
    else params.delete('search')
    setSearchParams(params)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-64 shrink-0">
          <div className="relative mb-6">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full rounded-md border border-slate-300 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      category === cat
                        ? 'bg-orange-500 text-white font-medium'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-4">{filtered.length} products found</p>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
