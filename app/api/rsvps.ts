// Camada de acesso a dados para RSVPs. Ver observações em ./gifts.ts.

import type { RSVPInput, RSVPRecord } from "@/types/forms";

const RSVPS_ENDPOINT = "/api/rsvps";

export async function createRSVP(input: RSVPInput): Promise<RSVPRecord> {
  // TODO (Next.js + Supabase): supabase.from("rsvps").insert(input).select().single();
  const res = await fetch(RSVPS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Falha ao enviar confirmação (${res.status})`);
  return (await res.json()) as RSVPRecord;
}

export async function fetchRSVPs(): Promise<RSVPRecord[]> {
  // TODO (Next.js + Supabase): consulta autenticada em /admin.
  const res = await fetch(RSVPS_ENDPOINT, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Falha ao carregar confirmações (${res.status})`);
  return (await res.json()) as RSVPRecord[];
}
