import ProductDetail from '@/components/ProductDetail';
import Link from 'next/link';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import products from '@/data/products.json';

async function getProduct(id: string) {
  if (!ObjectId.isValid(id)) return null;

  if (!process.env.MONGODB_URI || !clientPromise) {
    return products.find((p) => String(p.id) === id) || null;
  }

  const client = await clientPromise;
  const db = client.db();
  return await db.collection('products').findOne({ _id: new ObjectId(id) });
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const detailProduct = {
    id: product._id ? product._id.toString() : String(product.id),
    name: product.name,
    price: Number(product.price),
    image: product.image || '/placeholder.png',
    category: product.category || 'General',
    description: product.description || '',
  };

  return <ProductDetail product={detailProduct} />;
}
