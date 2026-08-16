export const formatPrice = (price) => {
  if (price === undefined || price === null) return "€ 0,00";
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};