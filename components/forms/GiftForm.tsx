// "use client";

// import { createGiftConfirmationAction } from "@/actions/gift-confirmations";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { giftWhatsappMessage, whatsappLink } from "@/config/event";
// import { formatPhone, unformatPhone } from "@/lib/format-phone";
// import type { Gift, GiftConfirmationUserInput } from "@/types/forms";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const schema = z.object({
//   name: z.string().trim().min(2, "Digite seu nome").max(80),
//   phone: z.string().trim().min(8, "Telefone inválido").max(20).nullable(),
//   giftId: z.string(),
//   eventId: z.string(),
//   paidValue: z.string().min(1, "Informe o valor").nullable(),
//   observation: z.string().max(300).nullable(),
//   proofSent: z.boolean(),
// });

// export type GiftFormProps = {
//   gift?: Gift;
//   eventId: string;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export function GiftForm({ gift, eventId, setOpen }: GiftFormProps) {
//   const [isSubmitting, setSubmitting] = useState(false);

//   const form = useForm<GiftConfirmationUserInput>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       giftId: gift?.id ?? "",
//       eventId,
//       paidValue: gift?.price ? String(gift.price) : "",
//       observation: null,
//       proofSent: false,
//     },
//   });

//   const handleSubmit = async (values: GiftConfirmationUserInput) => {
//     setSubmitting(true);
//     try {
//       await createGiftConfirmationAction(values);

//       const msg = giftWhatsappMessage({
//         name: values.name,
//         gift: gift?.name,
//         price: Number(values.paidValue),
//       });
//       window.open(whatsappLink(msg), "_blank", "noopener");
//       toast.success(
//         "Registrado! Abrimos o WhatsApp para envio do comprovante.",
//       );
//       setOpen(false);
//     } catch {
//       const msg = giftWhatsappMessage({
//         name: values.name,
//         gift: gift?.name,
//         price: values.paidValue ? Number(values.paidValue) : 0,
//       });
//       window.open(whatsappLink(msg), "_blank", "noopener");
//       toast.message("Abrimos o WhatsApp para envio do comprovante.");
//       setOpen(false);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//       {gift && (
//         <div className="rounded-md border border-silver bg-secondary/40 px-3 py-2 text-sm">
//           <div className="text-muted-foreground text-xs uppercase tracking-wider">
//             Presente
//           </div>
//           <div className="text-foreground font-medium">{gift.name}</div>
//         </div>
//       )}

//       <div className="space-y-2">
//         <Label htmlFor="gift-name">Seu nome *</Label>
//         <Input id="gift-name" {...form.register("name")} />
//         {form.formState.errors.name && (
//           <p className="text-xs text-destructive">
//             {form.formState.errors.name.message}
//           </p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="gift-phone">WhatsApp *</Label>
//         <Controller
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <Input
//               id="gift-phone"
//               type="tel"
//               inputMode="tel"
//               placeholder="Ex: (21) 90000-0000"
//               value={formatPhone(field.value ?? "")}
//               onChange={({ target }) =>
//                 field.onChange(unformatPhone(target.value))
//               }
//             />
//           )}
//         />
//         {form.formState.errors.phone && (
//           <p className="text-xs text-destructive">
//             {form.formState.errors.phone.message}
//           </p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="gift-observation">Observação (opcional)</Label>
//         <Textarea
//           id="gift-observation"
//           rows={2}
//           {...form.register("observation")}
//         />
//       </div>

//       <Button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full bg-silver-gradient text-black hover:opacity-90"
//       >
//         {isSubmitting ? "Enviando..." : "Confirmar e enviar comprovante"}
//       </Button>
//     </form>
//   );
// }
