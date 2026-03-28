/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[linear-gradient(180deg,#0F02F5,#00D0FA)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to MarketPlace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover amazing products at great prices
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Check out our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">Find what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
            <div className="text-5xl mb-3">💻</div>
            <h3 className="text-lg font-semibold">Electronics</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
            <div className="text-5xl mb-3">🏠</div>
            <h3 className="text-lg font-semibold">Home</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
            <div className="text-5xl mb-3">⚽</div>
            <h3 className="text-lg font-semibold">Sports</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
            <div className="text-5xl mb-3">👜</div>
            <h3 className="text-lg font-semibold">Accessories</h3>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[linear-gradient(180deg,#0F02F5,#00D0FA)]  text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to get special offers and updates
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 "
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">Real reviews from real people</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-4">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-4">
              "Great products and fast shipping! Will definitely shop here
              again."
            </p>
            <p className="font-semibold text-gray-900">- Sarah M.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-4">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-4">
              "Amazing customer service and quality products. Highly recommend!"
            </p>
            <p className="font-semibold text-gray-900">- John D.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-4">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-4">
              "Best online shopping experience I've had. Everything arrived
              perfect!"
            </p>
            <p className="font-semibold text-gray-900">- Emily R.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
