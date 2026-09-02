import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createRSVPAction } from "@/actions/rsvp";

import { ConfirmDialog } from "@/components/commons/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { formatPhone, unformatPhone } from "@/lib/format-phone";
import { Event } from "@/types/forms";

const schema = z.object({
  name: z.string().trim().min(2, "Digite seu nome completo").max(80),
  phone: z.string().regex(/^\d{10,11}$/, "Telefone inválido"),
  companions: z.number().int().min(0).max(10),
  attendance: z.boolean(),
  message: z.string().max(300).optional(),
});

export type RSVPInput = z.infer<typeof schema>;

export type RSVPFormProps = {
  event: Event;
  defaultValues?: Partial<RSVPInput>;
};

export function RSVPForm({ event }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<RSVPInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      companions: 0,
      attendance: true,
      message: "",
    },
  });

  const onSubmit = async (data: RSVPInput) => {
    setIsSubmitting(true);
    try {
      const eventId = event.id;
      const result = await createRSVPAction({ eventId, ...data });

      if (result.success) {
        const firstName = data.name.split(" ")[0];
        toast.success(`Presença confirmada, ${firstName}!`, {
          description: "Espero você lá! 💛",
          position: "bottom-center",
          duration: 5000,
        });

        form.reset();
      }
    } catch {
      toast.error(
        "Ocorreu um erro ao confirmar sua presença. Tente novamente mais tarde.",
        { position: "bottom-center" },
      );
      console.info("[RSVP mock]", data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="rsvp-name">Nome completo *</Label>
        <Input
          id="rsvp-name"
          placeholder="Ex: João da Silva"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rsvp-phone">WhatsApp *</Label>
        <Controller
          control={form.control}
          name="phone"
          render={({ field }) => (
            <Input
              id="rsvp-phone"
              type="tel"
              inputMode="tel"
              placeholder="Ex: (21) 90000-0000"
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="rsvp-companions">Acompanhantes</Label>
        <Input
          id="rsvp-companions"
          type="number"
          min={0}
          max={10}
          {...form.register("companions", { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rsvp-message">Nome(s) do(s) acompanhante(s):</Label>
        <Textarea
          id="rsvp-message"
          rows={3}
          placeholder="Ex: Maria, João, Ana"
          {...form.register("message")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-silver-gradient text-black hover:opacity-90"
      >
        {isSubmitting ? (
          <>
            <Spinner data-icon="inline-start" />
            Enviando...
          </>
        ) : (
          "Confirmar presença"
        )}
      </Button>
      {isModalOpen && <ConfirmDialog setIsModalOpen={setIsModalOpen} />}
    </form>
  );
}
