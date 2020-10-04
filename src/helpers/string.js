const toPercentage = (number) =>
  `${Number(number / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} %`;

export default {
  toPercentage,
};
