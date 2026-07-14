import Link from "next/link";
import {
  ArrowLeft,
  // Download,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";
// import { RSVPTable } from "@/components/admin/RSVPTable";
// import { GiftConfirmationTable } from "@/components/admin/GiftConfirmationTable";
// import { toast } from "sonner";
// import { fetchRSVPs } from "../api/rsvps";
// import { fetchGiftConfirmations } from "../api/gifts";
import { AdminContent } from "./admin-content";
import { GiftConfirmationRecord, RSVPRecord } from "@/types/forms";

const gifts: GiftConfirmationRecord[] = [
  {
    id: "1",
    price: 150,
    createdAt: new Date(),
    name: "Carlos Pereira",
    phone: "+55 31 99876-5432",
    giftId: "gift_1",
    giftName: "Conjunto de panelas",
    note: "Espero que gostem do presente!",
  },
  {
    id: "2",
    price: 200,
    createdAt: new Date(),
    name: "Ana Costa",
    phone: "+55 41 91234-5678",
    giftId: "gift_2",
    giftName: "Jogo de taças de vinho",
    note: "Desejo muitas felicidades ao casal!",
  },
];

export default async function AdminPage() {
  // const [rsvps, gifts] = await Promise.all([
  //   fetchRSVPs(),
  //   fetchGiftConfirmations(),
  // ]);

  return (
    <main className="min-h-screen bg-background">
      <header className="px-6 pt-8">
        <div className="mx-auto max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            className="text-silver hover:bg-accent"
          >
            <Link href="/">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao convite
            </Link>
          </Button>
        </div>
      </header>

      <section className="px-6 pt-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-silver" />
            <p className="text-silver-dim text-xs uppercase tracking-[0.3em]">
              área restrita
            </p>
          </div>
          <h1 className="text-silver-gradient mt-2 font-display text-4xl">
            Painel
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Autenticação será plugada ao Supabase na integração com Next.js.
          </p>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* <AdminContent rsvps={rsvps} gifts={gifts} /> */}
        </div>
      </section>
    </main>
  );
}
