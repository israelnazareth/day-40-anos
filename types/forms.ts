// Tipos compartilhados entre formulários, hooks e camada de API.
// Preparados para integração futura com Supabase (nomes em snake_case
// nos campos que virão do banco).

export type Gift = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  eventId: string;
  createdAt: Date | null;
  price: string | null;
};

export type RSVPInput = {
  name: string;
  phone: string;
  companions: number;
  attendance: boolean;
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

export type Event = {
  id: string;
  address: string | null;
  title: string;
  description: string | null;
  slug: string;
  subtitle: string | null;
  eventDate: Date;
  venueName: string | null;
  mapsUrl: string | null;
  mapsEmbed: string | null;
  pixKey: string | null;
  pixName: string | null;
  whatsapp: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}