import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminContent } from "./admin-content";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { getEventBySlug } from "@/lib/db/queries/events";
import { getRSVPs } from "@/lib/db/queries/rsvps";
import { getGiftConfirmations } from "@/lib/db/queries/gift-confirmations";

export default async function AdminPage() {
  const event = await getEventBySlug("day-40-anos");

  const giftConfirmations = await getGiftConfirmations(event?.id ?? "");

  const rsvps = await getRSVPs(event?.id ?? "");

  return (
    <main className="min-h-screen bg-background">
      <header className="px-6 pt-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-silver hover:bg-accent"
          >
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao convite
            </Link>
          </Button>
          <LogoutButton />
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
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <AdminContent rsvps={rsvps} giftConfirmations={giftConfirmations} />
        </div>
      </section>
    </main>
  );
}
