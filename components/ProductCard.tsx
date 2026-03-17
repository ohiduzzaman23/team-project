import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative h-64 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4">
          <span className="text-xs text-blue-600 font-semibold uppercase">{category}</span>
          <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{name}</h3>
          <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
