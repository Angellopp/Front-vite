import Fuse from 'fuse.js';
// Constants
export const itemsPerPage = 8;

// Utility function (if needed)
export const filterProducts = (products, value) => {
  const opciones = {
    keys: [
      'busqueda', 
    ],
    includeScore: true,
    threshold: 0.6
  };
  const products_busqueda = products.map(result => {
    result.busqueda = result.default_code + ' ' + result.name + ' ' +  result.description_sale;
    return result;
  });
  const fuse = new Fuse(products_busqueda, opciones);
  // console.log(products_busqueda);
  // const resultado1 = fuse.search(value);
  const result = fuse.search(value).map(result => result.item);
  // console.log(result);
  // console.log(products);
  // console.log(typeof resultado1);
  return products
    ? value
      ? result
      : products
    : [];
};