// Constants
export const itemsPerPage = 8;

// Utility function (if needed)
export const filterProducts = (products, value) => {
  return products
    ? value
      ? products.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description_sale?.toString().toLowerCase().includes(value.toLowerCase()) ||
          item.default_code?.toString().toLowerCase().includes(value.toLowerCase())
        )
      : products
    : [];
};