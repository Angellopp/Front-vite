import Fuse from 'fuse.js';
// Constants
export const itemsPerPage = 8;

// Utility function (if needed)
export const filterProducts = (products, model, value) => {
  console.log(model, value);
  const opcionesNombre = {
    keys: [
      'name', 
    ],
    includeScore: true,
    threshold: 0.3
  };
  const opcionesModel = {
    keys: [
      'busqueda', 
    ],
    includeScore: true,
    threshold: 0.3
  };
  const products_busqueda = products.map(result => {
    result.busqueda = result.description_sale;
    return result;
  });
  const filtradoNombre = new Fuse(products_busqueda, opcionesNombre);
  const filtradoModel = new Fuse(products_busqueda, opcionesModel);
  
  const resultNombre = filtradoNombre.search(value).map(result => result.item);
  const resultModel = filtradoModel.search(model).map(result => result.item);

  const result = resultNombre.filter(nombreItem =>
    resultModel.some(modelItem => modelItem.id === nombreItem.id)
  );
  console.log(result);
  return products
    ? value
      ? model
        ? result
        : resultNombre
      : model
        ? resultModel
        : products
    : [];
};