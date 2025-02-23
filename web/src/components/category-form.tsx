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

const categorySchema = z.object({
  name: z.string()
    .min(3, "Category name must be at least 3 characters long")
    .max(50, "Category name cannot exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, {
      message: "Category name can only contain letters and spaces"
    }),
});

interface CategoryFormProps {
  initialData?: z.infer<typeof categorySchema>;
  onSubmit: (data: z.infer<typeof categorySchema>) => Promise<{ statusCode: number; message: string }>;
  isLoading?: boolean;
}

export function CategoryForm({ initialData, onSubmit, isLoading }: CategoryFormProps): JSX.Element {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  // Reset form when `initialData` changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  async function handleSubmit(values: z.infer<typeof categorySchema>) {
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
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">
              Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all"
                placeholder="Category Name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        {/* Display error messages */}
        {form.formState.errors.root && (
          <p className="text-red-500 text-sm">{form.formState.errors.root.message}</p>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : initialData ? "Update" : "Create"} Category
        </Button>
      </form>
    </Form>
  );
}
