import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotal = useCartStore((state) => state.getTotal)
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/products"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const total = getTotal()
  const shipping = total > 50000 ? 0 : 199
  const grandTotal = total + shipping

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-xl shadow-sm divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md bg-slate-50" />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.category}</p>
                <p className="font-bold text-slate-900 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
              </div>

              <div className="flex items-center gap-3 border border-slate-200 rounded-md px-2 py-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-slate-600 hover:text-orange-500"
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-slate-600 hover:text-orange-500"
                >
                  <Plus size={16} />
                </button>
              </div>

              <p className="font-bold text-slate-900 w-24 text-right">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="p-4">
            <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
              Clear Cart
            </button>
          </div>
        </div>

        <div className="lg:w-80 bg-white rounded-xl shadow-sm p-6 h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-slate-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-slate-900 text-lg mb-6">
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Proceed to Checkout
          </button>
          <Link
            to="/products"
            className="block text-center text-sm text-slate-500 hover:text-orange-500 mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
