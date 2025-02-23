"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, JSX } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDealerStore } from "../stores/dealer.store";
import { useCategoryStore } from "../stores/category.store";
import { Category } from "../types/category.type";

const productSchema = z.object({
  name: z.string().min(3).max(50),
  sku: z.string().min(3).max(20),
  companyName: z.string().min(3).max(50),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.coerce.number().int().positive(),
  dealerId: z.coerce.number().int().positive().optional(),
  discount: z.coerce.number().min(0).optional(),
});

interface ProductFormProps {
  initialData?: z.infer<typeof productSchema>;
  onSubmit: (data: z.infer<typeof productSchema>) => Promise<{ statusCode: number; message: string }>;
  isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps): JSX.Element {
  const { dealers, fetchDealers } = useDealerStore();
  const { categories, fetchCategories } = useCategoryStore();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      sku: "",
      companyName: "",
      price: 0,
      stock: 0,
      categoryId: undefined,
      dealerId: undefined,
      discount: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
    fetchDealers();
    fetchCategories();
  }, [initialData, fetchDealers, fetchCategories]);

  async function handleSubmit(values: z.infer<typeof productSchema>) {
    try {
      const response = await onSubmit(values);
      if (response.statusCode >= 400) {
        form.setError("root", { message: response.message });
      } else {
        form.reset();
      }
    } catch (error: any) {
      form.setError("root", { message: error.message || "An unexpected error occurred" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">Name <span className="text-red-500">*</span></FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="sku" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">SKU <span className="text-red-500">*</span></FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField control={form.control} name="companyName" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">Company Name <span className="text-red-500">*</span></FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">Price <span className="text-red-500">*</span></FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="stock" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Stock <span className="text-red-500">*</span></FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="categoryId" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Category <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value ? String(field.value) : ""}>
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="dealerId" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Dealer</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value ? String(field.value) : ""}>
                <SelectTrigger><SelectValue placeholder="Select a dealer" /></SelectTrigger>
                <SelectContent>
                  {dealers.map((dealer) => (
                    <SelectItem key={dealer.id} value={String(dealer.id)}>
                      {dealer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="discount" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Discount</FormLabel>
            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : initialData ? "Update" : "Create"} Product
        </Button>
      </form>
    </Form>
  );
}
