// Configurações centrais do evento. Edite aqui para atualizar todo o site.

export const EVENT = {
  id: "day-40-anos",
  honoree: "Day Nazareth",
  age: 40,
  date: "2026-10-02T20:00:00-03:00", // ISO com fuso -03:00
  dateLabel: "02 de outubro de 2026",
  timeLabel: "20h",
  dressCode: "All black sem brilho",
  venueName: "Espaço Zarifi",
  address: "Rua das Margaridas, 335 — Vila Valqueire, Rio de Janeiro",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Espa%C3%A7o%20Zarifi%2C%20Rua%20das%20Margaridas%20335%2C%20Vila%20Valqueire%2C%20Rio%20de%20Janeiro&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Zarifi+Rua+das+Margaridas+335+Vila+Valqueire+Rio+de+Janeiro",
  whatsapp: "5521987086134", // formato E.164 sem "+"
  whatsappLabel: "+55 21 98708-6134",
  // TODO: preencher com a chave Pix real da Day
  pixKey: "+55 21 98708-6134",
  pixKeyType: "A definir",
  pixHolder: "Day",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function giftWhatsappMessage(params: {
  name: string;
  gift?: string;
  price: number;
}): string {
  const valor = params.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const item = params.gift ? ` (${params.gift})` : "";
  return `Oi Day! Sou ${params.name}. Fiz o Pix de ${valor}${item} como presente pelos seus 40 anos. Segue o comprovante 💛`;
}
