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
import type { Event, Gift, GiftConfirmationUserInput } from "@/types/forms";
import { giftWhatsappMessage, whatsappLink } from "@/config/event";

type GiftModalProps = {
  event: Event;
  gift: Gift | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GiftConfirmationUserInput) => Promise<void> | void;
};

export function GiftModal(props: GiftModalProps) {
  const { event, gift, open, onOpenChange, onSubmit } = props;
  const [isSubmitting, setSubmitting] = useState(false);

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(event.pixKey);
      toast.success("Chave Pix copiada!");
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };

  const handleSubmit = async (values: GiftConfirmationUserInput) => {
    setSubmitting(true);
    try {
      await onSubmit(values);
      const msg = giftWhatsappMessage({
        name: values.name,
        gift: gift?.name,
        price: Number(values.paidValue),
      });
      window.open(whatsappLink(msg), "_blank", "noopener");
      toast.success(
        "Registrado! Abrimos o WhatsApp para envio do comprovante.",
      );
      onOpenChange(false);
    } catch {
      const msg = giftWhatsappMessage({
        name: values.name,
        gift: gift?.name,
        price: values.paidValue ? Number(values.paidValue) : 0,
      });
      window.open(whatsappLink(msg), "_blank", "noopener");
      toast.message("Abrimos o WhatsApp para envio do comprovante.");
      onOpenChange(false);
    } finally {
      setSubmitting(false);
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
              onClick={copyPix}
              className="border-silver bg-transparent"
            >
              <Copy className="mr-1 h-4 w-4" /> Copiar
            </Button>
          </div>
        </div>

        <GiftForm
          gift={gift ?? undefined}
          eventId={event.id}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
