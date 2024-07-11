// Constants
export const itemsPerPage = 8;

// Utility function (if needed)
export const filterProducts = (products, value) => {
  return products
    ? value
      ? products.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      : products
    : [];
};