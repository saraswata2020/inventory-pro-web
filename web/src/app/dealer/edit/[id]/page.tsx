"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDealerStore } from "../../../../stores/dealer.store";
import { DealerForm } from "../../../../components/dealer-form";
import Loader from "../../../../components/ui/loading";
import { Dealer } from "../../../../types/dealer.type";

export default function EditDealerPage() {
  const router = useRouter();
  const { id } = useParams();
  const { dealers, editDealer, fetchDealers } = useDealerStore();
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  useEffect(() => {
    if (dealers.length > 0) {
      const foundDealer = dealers.find((d) => d.id === Number(id));
      if (foundDealer) {
        setDealer(foundDealer);
      } else {
        router.push("/dealer"); // Redirect if dealer not found
      }
      setLoading(false);
    }
  }, [dealers, id, router]);

  const handleSubmit = async (
    updatedDealer: Omit<Dealer, "id">
  ): Promise<{ statusCode: number; message: string }> => {
    if (!dealer) return { statusCode: 404, message: "Dealer not found" };
    await editDealer(dealer.id, updatedDealer);
    router.push("/dealer");
    return { statusCode: 200, message: "Dealer updated successfully" };
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Dealer</h2>
      {dealer && <DealerForm initialData={dealer} onSubmit={handleSubmit} />}
    </div>
  );
}
