import { Link } from 'react-router-dom'

const categoryImages = {
  Laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
  Smartphones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
  Headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
  'Smart Watches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
  Accessories: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80',
}

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Object.entries(categoryImages).map(([name, img]) => (
          <Link
            key={name}
            to={`/products?category=${encodeURIComponent(name)}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-center"
          >
            <img src={img} alt={name} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
            <p className="py-3 font-medium text-slate-700">{name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
