import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CategoryList from '../components/CategoryList'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

export default function Home() {
  const featured = products.slice(0, 8)

  return (
    <div>
      <Hero />
      <CategoryList />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
          <Link to="/products" className="text-orange-500 font-medium hover:underline">
            View All →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  )
}
