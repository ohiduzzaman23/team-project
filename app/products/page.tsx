import ProductCard from '@/components/ProductCard';
import clientPromise from '@/lib/mongodb';
import localProducts from '@/data/products.json';

type Product = {
  _id?: { toString: () => string };
  id?: number;
  name: string;
  price: number | string;
  image?: string;
  category?: string;
};

async function getProducts(): Promise<Product[]> {
  if (!process.env.MONGODB_URI || !clientPromise) {
    return localProducts;
  }

  const client = await clientPromise;
  const db = client.db();
  const products = await db.collection('products').find({}).toArray();
  return products as unknown as Product[];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => {
            const productId = product._id ? product._id.toString() : String(product.id);
            return (
              <ProductCard
                key={productId}
                id={productId}
                name={product.name}
                price={Number(product.price)}
                image={product.image || '/placeholder.png'}
                category={product.category || 'General'}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
