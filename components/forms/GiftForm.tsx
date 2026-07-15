import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Gift, GiftConfirmationUserInput } from "@/types/forms";

const schema = z.object({
  name: z.string().trim().min(2, "Digite seu nome").max(80),
  phone: z.string().trim().min(8, "Telefone inválido").max(20).nullable(),
  giftId: z.string(),
  eventId: z.string(),
  paidValue: z.string().min(1, "Informe o valor").nullable(),
  observation: z.string().max(300).nullable(),
});

export type GiftFormProps = {
  gift?: Gift;
  eventId: string;
  onSubmit: (data: GiftConfirmationUserInput) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function GiftForm({
  gift,
  eventId,
  onSubmit,
  isSubmitting,
}: GiftFormProps) {
  const form = useForm<GiftConfirmationUserInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      giftId: gift?.id ?? "",
      eventId,
      paidValue: gift?.price ? String(gift.price) : "",
      observation: null,
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => onSubmit(values))}
      className="space-y-4"
    >
      {gift && (
        <div className="rounded-md border border-silver bg-secondary/40 px-3 py-2 text-sm">
          <div className="text-muted-foreground text-xs uppercase tracking-wider">
            Presente
          </div>
          <div className="text-foreground font-medium">{gift.name}</div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="gift-name">Seu nome</Label>
        <Input id="gift-name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gift-phone">WhatsApp</Label>
        <Input
          id="gift-phone"
          type="tel"
          inputMode="tel"
          placeholder="(21) 90000-0000"
          {...form.register("phone")}
        />
        {form.formState.errors.phone && (
          <p className="text-xs text-destructive">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gift-paidValue">Valor do Pix (R$)</Label>
        <Input
          id="gift-paidValue"
          type="number"
          min={1}
          step="0.01"
          {...form.register("paidValue")}
        />
        {form.formState.errors.paidValue && (
          <p className="text-xs text-destructive">
            {form.formState.errors.paidValue.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gift-observation">Observação (opcional)</Label>
        <Textarea
          id="gift-observation"
          rows={2}
          {...form.register("observation")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-silver-gradient text-black hover:opacity-90"
      >
        {isSubmitting ? "Enviando..." : "Confirmar e enviar comprovante"}
      </Button>
    </form>
  );
}
