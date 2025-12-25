// Função para máscara de CPF/CNPJ
export function maskCpfCnpj(value: string) {
  value = value.replace(/\D/g, "");
  if (value.length <= 11) {
    // CPF: 999.999.999-99
    return value
      .replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4")
      .replace(/[-.]$/, "");
  }
  // CNPJ: 99.999.999/9999-99
  return value
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5")
    .replace(/[-/.]$/, "");
}
