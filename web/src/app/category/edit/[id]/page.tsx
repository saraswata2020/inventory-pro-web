"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import { useCategoryStore } from "../../../../stores/category.store";
import { ApiResponse } from "../../../../types/api-response.type";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const { categories, editCategory } = useCategoryStore();
  const [categoryName, setCategoryName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === Number(id));
    if (category) {
      setCategoryName(category.name);
    }
  }, [id, categories]);

  const handleUpdateCategory = async () => {
    if (!categoryName.trim()) {
      setAlertMessage("Category name cannot be empty.");
      setAlertType("error");
      return;
    }

    try {
      setIsLoading(true);
      setAlertMessage("");
      setAlertType("");

      const response: ApiResponse = await editCategory(Number(id), { name: categoryName });

      if (response.statusCode === 200) {
        setAlertMessage("Category updated successfully!");
        setAlertType("success");
        setTimeout(() => router.push("/category"), 2000); // Redirect after success
      } else {
        setAlertMessage(response.message || "Unexpected error occurred.");
        setAlertType("error");
      }
    } catch (error: any) {
      setAlertMessage(error.message || "Failed to update category.");
      setAlertType("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {alertMessage && (
          <Alert 
            variant={alertType === "success" ? "default" : "destructive"}
            className={alertType === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}
          >
            <AlertTitle>{alertType === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        <Card className="border border-gray-200 shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Category</h2>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Button onClick={handleUpdateCategory} disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
