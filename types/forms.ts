// Tipos compartilhados entre formulários, hooks e camada de API.
// Preparados para integração futura com Supabase (nomes em snake_case
// nos campos que virão do banco).

export type Gift = {
  id: string;
  createdAt: Date;
  image: string;
  name: string;
  price: string;
  description: string | null;
  eventId: string;
};

export type RSVPInput = {
  name: string;
  eventId: string;
  phone: string | null;
  companions: number | null;
  attendance: boolean | null;
  message: string | null;
};

export type RSVPRecord = RSVPInput & {
  id: string;
  createdAt: Date | null;
};

export type GiftConfirmationUserInput = {
  name: string;
  eventId: string;
  giftId: string;
  phone: string | null;
  paidValue: string | null;
  observation: string | null;
};

export type GiftConfirmationRecord = GiftConfirmationUserInput & {
  id: string;
  createdAt: Date | null;
};

export type Event = {
  id: string;
  address: string;
  title: string;
  description: string | null;
  slug: string;
  subtitle: string | null;
  eventDate: Date;
  venueName: string;
  mapsUrl: string;
  mapsEmbed: string;
  pixKey: string;
  pixName: string;
  whatsapp: string;
  createdAt: Date;
  updatedAt: Date;
};
