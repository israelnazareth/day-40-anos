export function formatValueToBRL(value: string) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
