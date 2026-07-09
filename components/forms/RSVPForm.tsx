import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { RSVPInput } from "@/types/forms";

const schema = z.object({
  name: z.string().trim().min(2, "Digite seu nome completo").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(20, "Telefone muito longo"),
  companions: z.number().int().min(0).max(10),
  message: z.string().max(300).optional(),
});

export type RSVPFormProps = {
  onSubmit: (data: RSVPInput) => Promise<void> | void;
  defaultValues?: Partial<RSVPInput>;
  isSubmitting?: boolean;
};

export function RSVPForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: RSVPFormProps) {
  const form = useForm<RSVPInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      companions: 0,
      message: "",
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
        form.reset({ ...form.getValues(), name: "", phone: "", message: "" });
      })}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="rsvp-name">Nome completo</Label>
        <Input
          id="rsvp-name"
          placeholder="Como você prefere ser chamado(a)"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rsvp-phone">WhatsApp</Label>
        <Input
          id="rsvp-phone"
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
        <Label htmlFor="rsvp-companions">Acompanhantes</Label>
        <Input
          id="rsvp-companions"
          type="number"
          min={0}
          max={10}
          {...form.register("companions")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rsvp-message">Mensagem para a Day (opcional)</Label>
        <Textarea
          id="rsvp-message"
          rows={3}
          placeholder="Deixe um recadinho carinhoso"
          {...form.register("message")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-silver-gradient text-black hover:opacity-90"
      >
        {isSubmitting ? "Enviando..." : "Confirmar presença"}
      </Button>
    </form>
  );
}
