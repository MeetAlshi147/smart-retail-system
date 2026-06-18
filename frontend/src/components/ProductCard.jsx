import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col group">
      <Link to={`/products/${product.id}`} className="block overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-orange-500 uppercase mb-1">
          {product.category}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-slate-800 line-clamp-2 mb-1 hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {product.rating}
        </div>
        <p className="text-lg font-bold text-slate-900 mb-3">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-orange-500 text-white font-medium py-2 rounded-md transition-colors"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
