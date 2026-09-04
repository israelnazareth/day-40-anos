function formatField(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function crc16CCITT(payload: string): string {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }

      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

type GeneratePixPayloadParams = {
  pixKey: string;
  amount?: number;
  merchantName: string;
  merchantCity: string;
  txid?: string;
};

export const PIX_KEY = "+5521987086134";

export function generateGiftPix(amount: number) {
  return generatePixPayload({
    pixKey: PIX_KEY,
    amount,
    merchantName: "DAYLLANE MUNIZ",
    merchantCity: "RIO DE JANEIRO",
  });
}

export function generatePixPayload({
  pixKey,
  amount,
  merchantName,
  merchantCity,
  txid = "***",
}: GeneratePixPayloadParams): string {
  const gui = formatField("00", "BR.GOV.BCB.PIX");
  const key = formatField("01", pixKey);

  const merchantAccountInformation = formatField(
    "26",
    gui + key,
  );

  const payload = [
    formatField("00", "01"),
    merchantAccountInformation,
    formatField("52", "0000"),
    formatField("53", "986"),
    ...(amount !== undefined
      ? [formatField("54", amount.toFixed(2))]
      : []),
    formatField("58", "BR"),
    formatField("59", merchantName.slice(0, 25)),
    formatField("60", merchantCity.slice(0, 15)),
    formatField(
      "62",
      formatField("05", txid.slice(0, 25)),
    ),
  ].join("");

  const payloadWithCrc = `${payload}6304`;

  return `${payloadWithCrc}${crc16CCITT(payloadWithCrc)}`;
}
