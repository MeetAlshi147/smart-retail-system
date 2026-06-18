import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function OrderSuccess() {
  const location = useLocation()
  const { orderId, total } = location.state || {}

  if (!orderId) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <CheckCircle2 size={72} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Order Placed Successfully!</h1>
      <p className="text-slate-500 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 text-left">
        <div className="flex justify-between py-2 border-b border-slate-100">
          <span className="text-slate-500">Order ID</span>
          <span className="font-semibold text-slate-800">{orderId}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-500">Amount Paid</span>
          <span className="font-semibold text-slate-800">₹{Number(total).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-8">
        Your order details have been sent to our analytics pipeline and will appear in your order
        history shortly.
      </p>

      <Link
        to="/products"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
