import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <p className="text-orange-400 font-semibold mb-2 tracking-wide uppercase text-sm">
            Big Savings Event
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Upgrade Your Tech, <br /> Without the Premium.
          </h1>
          <p className="text-slate-300 mb-8 max-w-md mx-auto md:mx-0">
            Shop the latest laptops, smartphones, headphones and smart wearables — all in one
            place, with prices that just make sense.
          </p>
          <Link
            to="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-8 py-3 rounded-md shadow-lg"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&q=80"
            alt="Latest tech gadgets"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  )
}
