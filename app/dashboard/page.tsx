"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
};

const defaultForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        (p.description || "").toLowerCase().includes(needle)
    );
  }, [products, query]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Could not load products");
      }
      const data = await res.json();
      setProducts(
        Array.isArray(data)
          ? data.map((item) => ({
              ...item,
              _id: item._id?.toString?.() ?? "",
            }))
          : []
      );
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes("MONGODB_URI")) {
        setError("MongoDB is not configured. Please set MONGODB_URI in .env.local to use the dashboard.");
      } else {
        setError(errMessage || "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(defaultForm);
    setEditId(null);
  };

  const setToast = (message: string, isError = false) => {
    if (isError) {
      setError(message);
      setSuccess(null);
    } else {
      setSuccess(message);
      setError(null);
    }
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name || !form.price || !form.category) {
      setToast("Please fill name, price, and category", true);
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      image: form.image,
    };

    try {
      setLoading(true);
      const url = editId ? `/api/products/${editId}` : "/api/products";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to save product");

      if (editId) {
        setProducts((prev) =>
          prev.map((item) => (item._id === editId ? { ...item, ...payload, _id: editId } : item))
        );
        setToast("Product updated successfully");
      } else {
        if (result.id) {
          setProducts((prev) => [...prev, { ...payload, _id: result.id } as Product]);
        }
        setToast("Product added successfully");
      }
      resetForm();
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes("MONGODB_URI")) {
        setToast("MongoDB is not configured. Please set MONGODB_URI in .env.local to manage products.", true);
      } else {
        setToast(errMessage || "Unknown error", true);
      }
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (product: Product) => {
    setEditId(product._id);
    setForm({
      name: product.name || "",
      price: String(product.price || ""),
      category: product.category || "",
      description: product.description || "",
      image: product.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (productId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete product");

      setProducts((prev) => prev.filter((item) => item._id !== productId));
      setToast("Product deleted successfully");
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (errMessage.includes("MONGODB_URI")) {
        setToast("MongoDB is not configured. Please set MONGODB_URI in .env.local to manage products.", true);
      } else {
        setToast(errMessage || "Delete failed", true);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {(success || error) && (
          <div
            className={`rounded-md px-4 py-3 text-sm font-medium ${
              success ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
            }`}
          >
            {success || error}
          </div>
        )}

        <form onSubmit={onSubmit} className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {editId ? "Update Product" : "Add Product"}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            />
            <input
              placeholder="Price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            />
            <input
              placeholder="Image URL (or upload below)"
              value={form.image}
              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <label className="mt-4 flex flex-col gap-2 text-sm">
            Upload Image (optional)
            <input type="file" accept="image/*" onChange={onFileChange} />
          </label>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none mt-4"
            rows={3}
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-slate-100"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-800">All Products</h2>
            <input
              placeholder="Search by name, category, description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full lg:w-96 rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {loading && <p className="text-slate-500">Loading products...</p>}
          {!loading && filteredProducts.length === 0 && <p className="text-slate-500">No products found.</p>}

          {!loading && filteredProducts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-3 py-2">Preview</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="border-b border-slate-100">
                      <td className="px-3 py-2">
                        {product.image ? (
                          <div className="relative h-12 w-16 overflow-hidden rounded-md">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 64px, 64px" />
                          </div>
                        ) : (
                          <div className="h-12 w-16 rounded-md bg-slate-100" />
                        )}
                      </td>
                      <td className="px-3 py-2 font-medium text-slate-700">{product.name}</td>
                      <td className="px-3 py-2 text-slate-500">{product.category}</td>
                      <td className="px-3 py-2 text-slate-700">${product.price.toFixed(2)}</td>
                      <td className="px-3 py-2 space-x-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="rounded-lg bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(product._id)}
                          className="rounded-lg bg-rose-500 px-3 py-1 text-white hover:bg-rose-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
