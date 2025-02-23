"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProductStore } from "../../../../stores/product.store";
import { Product } from "../../../../types/product.type";
import { ProductForm } from "../../../../components/product-form";
import  Loader  from "../../../../components/ui/loading";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { products, editProduct, fetchProducts } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        router.push("/product"); // Redirect if product not found
      }
      setLoading(false);
    }
  }, [products, id, router]);

  const handleSubmit = async (updatedProduct: Omit<Product, "id">): Promise<{ statusCode: number; message: string }> => {
    if (!product) return { statusCode: 404, message: "Product not found" };
    await editProduct(product.id, updatedProduct);
    router.push("/product");
    return { statusCode: 200, message: "Product updated successfully" };
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      {product && <ProductForm initialData={product} onSubmit={handleSubmit} />}
    </div>
  );
}
