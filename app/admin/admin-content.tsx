"use client";

import { GiftConfirmationTable } from "@/components/admin/GiftConfirmationTable";
import { RSVPTable } from "@/components/admin/RSVPTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiftConfirmationRecord, RSVPRecord } from "@/types/forms";
import { Download } from "lucide-react";
import { toast } from "sonner";

export function AdminContent({
  rsvps,
  giftConfirmations,
}: {
  rsvps: RSVPRecord[];
  giftConfirmations: GiftConfirmationRecord[];
}) {
  return (
    <Tabs defaultValue="rsvps">
      <div className="flex items-center justify-between gap-3">
        <TabsList className="bg-secondary/60">
          <TabsTrigger value="rsvps">Confirmações</TabsTrigger>
          <TabsTrigger value="gifts">Presentes</TabsTrigger>
        </TabsList>
        <Button
          size="sm"
          variant="outline"
          className="border-silver bg-transparent"
          onClick={() => toast.info("Exportação disponível após integração.")}
        >
          <Download className="mr-1 h-4 w-4" /> Exportar
        </Button>
      </div>

      <TabsContent value="rsvps" className="mt-6">
        {/* {rsvps.isLoading ? (
                <Skeleton className="h-40 w-full rounded-md" />
              ) : rsvps.isError || !rsvps.data ? (
                <RSVPTable data={[]} />
              ) : ( */}
        <RSVPTable data={rsvps} />
        {/* )} */}
      </TabsContent>

      <TabsContent value="gifts" className="mt-6">
        {/* {gifts.isLoading ? (
                <Skeleton className="h-40 w-full rounded-md" />
              ) : gifts.isError || !gifts.data ? (
                <GiftConfirmationTable data={[]} />
              ) : ( */}
        <GiftConfirmationTable giftConfirmations={giftConfirmations} />
        {/* )} */}
      </TabsContent>
    </Tabs>
  );
}
