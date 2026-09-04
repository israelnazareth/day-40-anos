"use client";

import { createGiftConfirmationAction } from "@/actions/gift-confirmations";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatValueToBRL } from "@/lib/format-currency";
import { formatPhone, unformatPhone } from "@/lib/format-phone";
import { GiftConfirmationInput } from "@/schemas/gift-confirmations";
import type { Event, Gift } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { generateGiftPix } from "@/lib/pix";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  name: z.string().trim().min(2, "Digite seu nome").max(80),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  observation: z.string().max(300).nullable(),
  proofSent: z.boolean().refine((val) => val === true, {
    message: "Marque se já enviou o comprovante",
  }),
});

type GiftFormValues = z.infer<typeof FormSchema>;

type GiftModalProps = {
  event: Event;
  gift: Gift | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GiftModal(props: GiftModalProps) {
  const { event, gift, open, setOpen } = props;
  const [isSubmitting, setSubmitting] = useState(false);

  const copyPastePix = useMemo(() => {
    return generateGiftPix(Number(gift?.price ?? 0));
  }, [gift?.price]);

  const form = useForm<GiftFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      observation: null,
      proofSent: false,
    },
  });

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(copyPastePix);
      toast.success(
        "Código Pix copiado! Agora basta colar no aplicativo do seu banco.",
      );
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };

  const handleSubmit = async (values: GiftFormValues) => {
    setSubmitting(true);
    try {
      const payload: GiftConfirmationInput = {
        eventId: event.id,
        giftId: gift!.id,
        paidValue: gift!.price,
        name: values.name,
        phone: values.phone,
        observation: values.observation || null,
      };

      await createGiftConfirmationAction(payload);

      const userName = values.name.split(" ")[0];

      toast.success(`Registrado! Muito obrigada pelo presente, ${userName}!`);

      setOpen(false);

      form.reset();
    } catch {
      toast.error("Erro ao registrar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto border-border bg-card p-0">
        <div className="p-4 pt-10">
          <p className="font-body text-[9px] uppercase tracking-[0.35em] text-primary/70">
            Pagamento via PIX
          </p>
          <h3 className="mt-0.5 font-display text-2xl leading-tight text-deep">
            {gift?.name}
          </h3>
          <p className="font-display text-lg text-ocean">
            {formatValueToBRL(gift?.price ?? 0)}
          </p>

          <div className="mt-3 rounded-xl border border-border bg-linear-to-br from-foam/60 to-secondary/60 p-3">
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <QRCode value={copyPastePix} size={120} level="M" />
                </div>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="font-bold text-[10px] uppercase tracking-[0.25em] text-silver">
                  Pague pelo banco
                </p>
                <div className="flex flex-wrap mt-1 font-body text-[12px] text-muted-foreground">
                  <p className="mr-2">Clique no botão</p>
                  <span className="font-semibold text-silver inline-flex items-center gap-1">
                    <Copy className="mr-1 h-4 w-4" /> Copiar Pix
                  </span>
                  <p>
                    para copiar o código Pix e cole no aplicativo do seu banco.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 p-4 w-full inline-flex items-center justify-center gap-1.5 border-silver bg-transparent"
                  onClick={copyPixCode}
                >
                  <Copy className="mr-1 h-4 w-4" /> Copiar Pix
                </Button>
              </div>
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-3 space-y-2"
          >
            <h4 className="font-sans text-sm">
              Após pagar, registre seu presente:
            </h4>
            <Input
              placeholder="Seu nome completo"
              maxLength={120}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-xs text-deep outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/20"
              type="text"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => (
                <Input
                  placeholder="Telefone (WhatsApp)"
                  maxLength={30}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-xs text-deep outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/20"
                  type="tel"
                  value={formatPhone(field.value ?? "")}
                  onChange={({ target }) =>
                    field.onChange(unformatPhone(target.value))
                  }
                />
              )}
            />
            {form.formState.errors.phone && (
              <p className="text-xs text-destructive">
                {form.formState.errors.phone.message}
              </p>
            )}

            <Textarea
              placeholder="Mensagem (opcional)"
              maxLength={1000}
              rows={2}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-xs text-deep outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/20 resize-none"
              {...form.register("observation")}
            />

            <FieldLabel className="cursor-pointer">
              <Field orientation="horizontal">
                <Controller
                  control={form.control}
                  name="proofSent"
                  render={({ field }) => (
                    <Checkbox
                      id="proofSent"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldContent>
                  <FieldTitle className="text-xs">
                    Já enviei o comprovante pelo WhatsApp
                  </FieldTitle>
                  <FieldDescription className="text-xs">
                    Marque após enviar o print para +55 (21) 98708-6134
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
            {form.formState.errors.proofSent && (
              <p className="text-xs text-destructive">
                {form.formState.errors.proofSent.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-silver-gradient w-full text-black hover:brightness-75 p-5 text-md"
            >
              <Sparkles className="h-3.5 w-3.5" /> Confirmar presente
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
