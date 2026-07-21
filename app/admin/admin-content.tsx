"use client";

import { useState } from "react";
import { GiftConfirmationTable } from "@/components/admin/GiftConfirmationTable";
import { RSVPTable } from "@/components/admin/RSVPTable";
import { GiftTable } from "@/components/admin/GiftTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiftConfirmationsRecord } from "@/lib/db/schema";
import { Gift, RSVPRecord } from "@/types/forms";
import { useIsMobile } from "@/hooks/use-mobile";
import { Gift as GiftIcon, List, Package } from "lucide-react";
import React from "react";

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
  const isMobile = useIsMobile();

  const handleGiftsRefresh = () => {
    setGiftsKey((prev) => prev + 1);
  };

  const items = [
    {
      label: "Confirmações",
      value: "rsvps",
      icon: List,
    },
    {
      label: "Presentes Recebidos",
      value: "gifts",
      icon: GiftIcon,
    },
    {
      label: "Gerenciar Presentes",
      value: "manage-gifts",
      icon: Package,
    },
  ];

  return (
    <Tabs defaultValue="rsvps">
      <div className="flex items-center justify-between gap-3">
        <TabsList className="bg-secondary/60 justify-between max-md:flex-1">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              className="cursor-pointer"
              value={item.value}
            >
              <span className="mr-2 flex items-center gap-2">
                {React.createElement(item.icon, { className: "w-4 h-4" })}
                {isMobile ? `${item.label.slice(0, 3)}.` : item.label}
              </span>
            </TabsTrigger>
          ))}
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
