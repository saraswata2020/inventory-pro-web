"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const dealerSchema = z.object({
  name: z.string().min(3).max(50),
  company: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(20),
  address: z.string().optional(),
});

interface DealerFormProps {
  initialData?: z.infer<typeof dealerSchema>;
  onSubmit: (data: z.infer<typeof dealerSchema>) => Promise<{ statusCode: number; message: string }>;
  isLoading?: boolean;
}

export function DealerForm({ initialData, onSubmit, isLoading }: DealerFormProps) {
  const form = useForm<z.infer<typeof dealerSchema>>({
    resolver: zodResolver(dealerSchema),
    defaultValues: initialData || {
      name: "",
      company: undefined,
      email: undefined,
      phone: "",
      address: undefined,
    },
  });

  async function handleSubmit(values: z.infer<typeof dealerSchema>) {
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
        <div className="grid grid-cols-1 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">
                Company 
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">
                Email 
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">
                Phone <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 mb-1 block text-sm">
                Address
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : initialData ? "Update" : "Create"} Dealer
        </Button>
      </form>
    </Form>
  );
}
