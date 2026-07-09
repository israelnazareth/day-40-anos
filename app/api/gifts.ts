// Camada de acesso a dados para presentes.
// Hoje faz fetch em endpoints ainda inexistentes — os componentes tratam
// os estados de loading/erro/vazio. Ao migrar para Next.js + Supabase,
// substitua o corpo destas funções (ou implemente os route handlers).

import type { Gift, GiftConfirmationInput, GiftConfirmationRecord } from "@/types/forms";

const GIFTS_ENDPOINT = "/api/gifts";
const CONFIRMATIONS_ENDPOINT = "/api/gift-confirmations";

export async function fetchGifts(): Promise<Gift[]> {
  // TODO (Next.js + Supabase): substituir por
  //   const { data, error } = await supabase.from("gifts").select("*").order("amount");
  const res = await fetch(GIFTS_ENDPOINT, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Falha ao carregar presentes (${res.status})`);
  return (await res.json()) as Gift[];
}

export async function createGiftConfirmation(
  input: GiftConfirmationInput,
): Promise<GiftConfirmationRecord> {
  // TODO (Next.js + Supabase): substituir por
  //   const { data, error } = await supabase.from("gift_confirmations").insert(input).select().single();
  const res = await fetch(CONFIRMATIONS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Falha ao registrar presente (${res.status})`);
  return (await res.json()) as GiftConfirmationRecord;
}

export async function fetchGiftConfirmations(): Promise<GiftConfirmationRecord[]> {
  // TODO (Next.js + Supabase): substituir por consulta autenticada.
  const res = await fetch(CONFIRMATIONS_ENDPOINT, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Falha ao carregar confirmações (${res.status})`);
  return (await res.json()) as GiftConfirmationRecord[];
}
