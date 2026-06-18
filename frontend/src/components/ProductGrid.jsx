import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        No products found. Try a different search or category.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
