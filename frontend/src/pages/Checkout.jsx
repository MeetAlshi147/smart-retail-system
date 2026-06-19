import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

// TODO: Replace with your deployed Cloud Run order-api URL
const ORDER_API_URL = 'https://order-api-195476262139.asia-south1.run.app'

export default function Checkout() {
  const cart = useCartStore((state) => state.cart)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add some products before checking out.</p>
        <Link
          to="/products"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const total = getTotal()
  const shipping = total > 50000 ? 0 : 199
  const grandTotal = total + shipping

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.phone || !form.address) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    const orderId = `ORD-${Date.now()}`

    const orderPayload = {
      order_id: orderId,
      customer: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cart.map((item) => ({
        product: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      amount: grandTotal,
    }

    try {
      const response = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) {
        throw new Error(`Order API responded with status ${response.status}`)
      }

      clearCart()
      navigate('/order-success', { state: { orderId, total: grandTotal } })
    } catch (err) {
      console.error('Order placement failed:', err)
      setError(
        'Could not place your order right now. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Delivery Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              placeholder="House no, Street, City, State, PIN code"
              className="w-full rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-md transition-colors"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <div className="lg:w-80 bg-white rounded-xl shadow-sm p-6 h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h2>
          <div className="divide-y divide-slate-100 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span className="text-slate-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-slate-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
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
          <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-slate-900 text-lg">
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
