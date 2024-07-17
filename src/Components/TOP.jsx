import { useEffect, useState } from "react";
import ImageUrl from "./image/ImageUrl";
// import DrawerCard from "./drawer_card/DrawerCard";
import { ModalCard } from "./modal/ModalCard";
import PaginationCard from "./utils/PaginationCard";
import PropTypes from "prop-types"; // Importa PropTypes
import { itemsPerPage, filterProducts } from "./constants"; 
import PopoverStock from "./popover/PopoverStock";

const TOP = ({ products, value, locationId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataToCard, setDataToCard] = useState({ id: 1, name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 8; // Puedes ajustar la cantidad de elementos por página

  const handleClose = () => setIsOpen(false);
  useEffect(() => {
    setCurrentPage(1);
  }, [value])
  const filasFiltradas = filterProducts(products, value);

  // Calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filasFiltradas.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(filasFiltradas.length / itemsPerPage);

  return (
    <>
      <div className="grid gap-12 p-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto shadow-md sm:rounded-lg">
        {currentItems &&
          currentItems.map((item) => (
            <div
              key={item.id}
              className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-center">
                <a onClick={() => { setIsOpen(true); setDataToCard(item); }}>
                  <ImageUrl
                    model="product.product"
                    field="image_256"
                    id={item.id}
                    alt={item.name}
                  />
                </a>
              </div>
              <div className="px-5 pb-5">
                <a className="items-center" href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    [{item.default_code}] {item.name}
                  </h5>
                </a>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {"S/. " + item.lst_price}
                  </span>
                    <PopoverStock dataToPopover={item} locationId={locationId}/>
                </div>
              </div>
            </div>
          ))}
      </div>
      <PaginationCard
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {/* <DrawerCard isOpen={isOpen} handleClose={handleClose} dataToCard={dataToCard}/> */}
      <ModalCard isOpen={isOpen} handleClose={handleClose} dataToCard={dataToCard}/>
    </>
  );
};

TOP.propTypes = {
  products: PropTypes.array,
  value: PropTypes.string,
  locationId: PropTypes.number
};

export default TOP;