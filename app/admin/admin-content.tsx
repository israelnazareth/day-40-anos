"use client";

import { useState } from "react";
import { GiftConfirmationTable } from "@/components/admin/GiftConfirmationTable";
import { RSVPTable } from "@/components/admin/RSVPTable";
import { GiftTable } from "@/components/admin/GiftTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiftConfirmationsRecord } from "@/lib/db/schema";
import { RSVPRecord } from "@/types/forms";
import type { Gift } from "@/types/forms";

export function AdminContent({
  rsvps,
  giftConfirmations,
  gifts,
}: {
  rsvps: RSVPRecord[];
  giftConfirmations: GiftConfirmationsRecord[];
  gifts: Gift[];
}) {
  const [giftsKey, setGiftsKey] = useState(0);

  const handleGiftsRefresh = () => {
    setGiftsKey((prev) => prev + 1);
  };

  return (
    <Tabs defaultValue="rsvps">
      <div className="flex items-center justify-between gap-3">
        <TabsList className="bg-secondary/60">
          <TabsTrigger className="cursor-pointer p-3" value="rsvps">
            Confirmações
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer p-3" value="gifts">
            Presentes Confirmados
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer p-3" value="manage-gifts">
            Gerenciar Presentes
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="rsvps" className="mt-6">
        <RSVPTable rsvps={rsvps} />
      </TabsContent>

      <TabsContent value="gifts" className="mt-6">
        <GiftConfirmationTable giftConfirmations={giftConfirmations} />
      </TabsContent>

      <TabsContent value="manage-gifts" className="mt-6">
        <GiftTable
          key={giftsKey}
          gifts={gifts}
          onRefresh={handleGiftsRefresh}
        />
      </TabsContent>
    </Tabs>
  );
}
