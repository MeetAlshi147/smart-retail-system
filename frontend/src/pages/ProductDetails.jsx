import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import ProductGrid from '../components/ProductGrid'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product not found</h2>
        <Link to="/products" className="text-orange-500 font-medium hover:underline">
          ← Back to Products
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleBuyNow = () => {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-slate-600 hover:text-orange-500 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl p-6">
          <img src={product.image} alt={product.name} className="max-h-96 object-contain" />
        </div>

        <div className="flex-1">
          <span className="text-xs font-semibold text-orange-500 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
              <Star size={14} className="fill-green-700" />
              {product.rating}
            </div>
            <span className="text-slate-400 text-sm">Verified Ratings</span>
          </div>

          <p className="text-3xl font-extrabold text-slate-900 mb-4">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 font-semibold px-6 py-3 rounded-md hover:bg-orange-50 transition-colors"
            >
              {added ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />}
              {added ? 'Added!' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">You might also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
