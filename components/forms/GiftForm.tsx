import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Gift, GiftConfirmationInput } from "@/types/forms";

const schema = z.object({
  name: z.string().trim().min(2, "Digite seu nome").max(80),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  gift_id: z.string().nullable().optional(),
  gift_name: z.string().nullable().optional(),
  amount: z.coerce.number().min(1, "Informe o valor"),
  note: z.string().max(300).optional(),
});

export type GiftFormProps = {
  gift?: Gift;
  onSubmit: (data: GiftConfirmationInput) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function GiftForm({ gift, onSubmit, isSubmitting }: GiftFormProps) {
  const form = useForm<GiftConfirmationInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      gift_id: gift?.id ?? null,
      gift_name: gift?.name ?? null,
      amount: gift?.amount ?? 0,
      note: "",
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
        <Label htmlFor="gift-amount">Valor do Pix (R$)</Label>
        <Input
          id="gift-amount"
          type="number"
          min={1}
          step="0.01"
          {...form.register("amount")}
        />
        {form.formState.errors.amount && (
          <p className="text-xs text-destructive">
            {form.formState.errors.amount.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gift-note">Observação (opcional)</Label>
        <Textarea id="gift-note" rows={2} {...form.register("note")} />
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
