"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GiftCard } from "@/components/gifts/GiftCard";
import { GiftModal } from "@/components/gifts/GiftModal";
import { Footer } from "@/components/invite/Footer";
import type { Event, Gift } from "@/types/forms";

export function GiftsView({ event, gifts }: { event: Event; gifts: Gift[] }) {
  // const { data, isLoading, isError, refetch } = useGifts();
  const [selected, setSelected] = useState<Gift | null>(null);
  const [open, setOpen] = useState(false);

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(event.pixKey);
      toast.success("Chave Pix copiada!");
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="px-6 pt-8">
        <div className="mx-auto max-w-md">
          <Button
            variant="ghost"
            size="sm"
            className="text-silver hover:bg-accent"
          >
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao convite
            </Link>
          </Button>
        </div>
      </header>

      <section className="px-6 pt-6 pb-4 text-center">
        <p className="text-silver-dim mb-3 text-xs uppercase tracking-[0.4em]">
          Lista de presentes
        </p>
        <h1 className="text-silver-gradient font-display text-4xl">
          Presenteie a Day!
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
          Sua presença já é o maior presente. Mas se quiser mimar a Day, escolha
          um item abaixo, faça o Pix e envie o comprovante pelo WhatsApp.
        </p>
      </section>

      <section className="px-6 py-6">
        <div className="mx-auto max-w-md rounded-lg border border-silver bg-card/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-silver-dim text-[0.65rem] uppercase tracking-widest">
                Chave Pix:
              </div>
              <div className="truncate text-sm text-foreground">
                {event.pixKey}
              </div>
              <div className="text-muted-foreground text-xs">
                Titular: {event.pixName}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-silver bg-transparent"
              onClick={copyPix}
            >
              <Copy className="mr-1 h-4 w-4" /> Copiar
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-6">
        <div className="mx-auto grid max-w-md gap-4">
          {/* {isLoading && (
            <>
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </>
          )}

          {isError && (
            <div className="rounded-md border border-dashed border-silver bg-card/30 p-8 text-center text-sm text-muted-foreground">
              A lista ainda está sendo preparada. Volte em breve!
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-silver bg-transparent"
                  onClick={() => refetch()}
                >
                  Tentar novamente
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !isError && data && data.length === 0 && (
            <div className="rounded-md border border-dashed border-silver bg-card/30 p-8 text-center text-sm text-muted-foreground">
              A lista ainda não foi publicada.
            </div>
          )} */}

          {// !isLoading &&
          // !isError &&
          gifts?.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onSelect={(g) => {
                setSelected(g);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      <GiftModal gift={selected} open={open} setOpen={setOpen} event={event} />

      <Footer />
    </main>
  );
}
