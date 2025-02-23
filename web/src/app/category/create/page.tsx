"use client";

import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { CategoryForm } from "../../../components/category-form";
import { useCategoryStore } from "../../../stores/category.store";
import { ApiResponse } from "../../../types/api-response.type";

export default function CreateCategoryPage() {
  const { addCategory } = useCategoryStore();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      setAlertMessage("");
      setAlertType("");

      const response: ApiResponse = await addCategory(values);

      if (response.statusCode === 200 || response.statusCode === 201) {
        setAlertMessage(response.message || "Category added successfully!");
        setAlertType("success");
      } else {
        setAlertMessage(response.message || "Unexpected error occurred.");
        setAlertType("error");
      }
      return response;
    } catch (error: any) {
      setAlertMessage(error.message || "Failed to add category.");
      setAlertType("error");
      throw error;
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
            <h2 className="text-2xl font-bold mb-6">Create New Category</h2>
            <CategoryForm
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
