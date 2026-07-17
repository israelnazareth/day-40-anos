"use client";

import { GiftConfirmationTable } from "@/components/admin/GiftConfirmationTable";
import { RSVPTable } from "@/components/admin/RSVPTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiftConfirmationsRecord } from "@/lib/db/schema";
import { RSVPRecord } from "@/types/forms";

export function AdminContent({
  rsvps,
  giftConfirmations,
}: {
  rsvps: RSVPRecord[];
  giftConfirmations: GiftConfirmationsRecord[];
}) {
  return (
    <Tabs defaultValue="rsvps">
      <div className="flex items-center justify-between gap-3">
        <TabsList className="bg-secondary/60">
          <TabsTrigger className="cursor-pointer p-3" value="rsvps">
            Confirmações
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer p-3" value="gifts">
            Presentes
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="rsvps" className="mt-6">
        <RSVPTable rsvps={rsvps} />
      </TabsContent>

      <TabsContent value="gifts" className="mt-6">
        <GiftConfirmationTable giftConfirmations={giftConfirmations} />
      </TabsContent>
    </Tabs>
  );
}
