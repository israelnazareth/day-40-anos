import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { GiftForm } from "@/components/forms/GiftForm";
import type { Gift, GiftConfirmationInput } from "@/types/forms";
import { EVENT, giftWhatsappMessage, whatsappLink } from "@/config/event";

export function GiftModal({
  gift,
  open,
  onOpenChange,
  onSubmit,
}: {
  gift: Gift | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GiftConfirmationInput) => Promise<void> | void;
}) {
  const [isSubmitting, setSubmitting] = useState(false);

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(EVENT.pixKey);
      toast.success("Chave Pix copiada!");
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto border-silver bg-card">
        <DialogHeader>
          <DialogTitle className="text-silver-gradient font-display text-2xl">
            Presentear com Pix
          </DialogTitle>
          <DialogDescription>
            Faça o Pix para a chave abaixo, preencha o formulário e envie o
            comprovante pelo WhatsApp da Day.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 rounded-md border border-silver bg-secondary/40 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-silver-dim text-[0.65rem] uppercase tracking-widest">
                Chave Pix ({EVENT.pixKeyType})
              </div>
              <div className="truncate text-sm text-foreground">
                {EVENT.pixKey}
              </div>
              <div className="text-muted-foreground text-xs">
                Titular: {EVENT.pixHolder}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={copyPix}
              className="border-silver bg-transparent"
            >
              <Copy className="mr-1 h-4 w-4" /> Copiar
            </Button>
          </div>
        </div>

        <GiftForm
          gift={gift ?? undefined}
          isSubmitting={isSubmitting}
          onSubmit={async (values) => {
            setSubmitting(true);
            try {
              await onSubmit(values);
              const msg = giftWhatsappMessage({
                name: values.name,
                gift: values.giftName ?? undefined,
                price: values.price ?? 0,
              });
              window.open(whatsappLink(msg), "_blank", "noopener");
              toast.success(
                "Registrado! Abrimos o WhatsApp para envio do comprovante.",
              );
              onOpenChange(false);
            } catch (err) {
              // Silencioso: a API ainda não existe. Ainda assim abre o WhatsApp.
              const msg = giftWhatsappMessage({
                name: values.name,
                gift: values.giftName ?? undefined,
                price: values.price ?? 0,
              });
              window.open(whatsappLink(msg), "_blank", "noopener");
              toast.message("Abrimos o WhatsApp para envio do comprovante.");
              onOpenChange(false);
            } finally {
              setSubmitting(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
