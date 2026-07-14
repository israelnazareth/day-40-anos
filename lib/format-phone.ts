export function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (!numbers) return "";

  // 1º dígito do DDD
  if (numbers.length === 1) {
    return `(${numbers}`;
  }

  // DDD completo
  if (numbers.length === 2) {
    return `(${numbers})`;
  }

  const ddd = numbers.slice(0, 2);
  const phone = numbers.slice(2);

  // Telefone de 8 dígitos (XXXX-XXXX)
  if (phone.length <= 4) {
    return `(${ddd}) ${phone}`;
  }

  if (phone.length <= 8) {
    return `(${ddd}) ${phone.slice(0, 4)}-${phone.slice(4)}`;
  }

  // Telefone de 9 dígitos (XXXXX-XXXX)
  return `(${ddd}) ${phone.slice(0, 5)}-${phone.slice(5)}`;
}

export function unformatPhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}