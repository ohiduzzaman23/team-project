'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div>
          <span className="text-sm text-blue-600 font-semibold uppercase">{product.category}</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>
          
          <button 
            onClick={handleAddToCart}
            className={`w-full md:w-auto px-8 py-3 rounded-lg text-lg font-semibold transition ${
              added 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
          
          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ 30-day return policy</li>
              <li>✓ Secure checkout</li>
              <li>✓ 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
