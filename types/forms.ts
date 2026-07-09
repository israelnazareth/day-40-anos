// Tipos compartilhados entre formulários, hooks e camada de API.
// Preparados para integração futura com Supabase (nomes em snake_case
// nos campos que virão do banco).

export type Gift = {
  id: string;
  name: string;
  description?: string | null;
  amount: number; // em reais
  image_url?: string | null;
  claimed?: boolean;
};

export type RSVPInput = {
  name: string;
  phone: string;
  companions: number;
  message?: string;
};

export type RSVPRecord = RSVPInput & {
  id: string;
  created_at: string;
};

export type GiftConfirmationInput = {
  name: string;
  phone: string;
  gift_id?: string | null;
  gift_name?: string | null;
  amount: number;
  note?: string;
};

export type GiftConfirmationRecord = GiftConfirmationInput & {
  id: string;
  created_at: string;
};
