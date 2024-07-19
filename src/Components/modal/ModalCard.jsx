
"use client";

import { Button, Modal, List, Popover } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import PropTypes from "prop-types"; // Importa PropTypes
import ImageUrl from "../image/ImageUrl";
import useProductStock from "../../hooks/products/useProductStock";
import Loading from "../indicators/Loading";

export function ModalCard({ isOpen, handleClose, dataToCard, locationId }) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const parsedCompaniesIds = userData && userData.available_companies_ids ? userData.available_companies_ids : [];
  const { data: productStock, isLoading, isError} = useProductStock(dataToCard.id, parsedCompaniesIds, locationId !== 0 ? locationId : 0 || []);
  const ContentPopover = ( company_id, warehouse_id) => {
    return (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white"> {company_id} <br/>{warehouse_id}</h3>
            </div>
        </div>
    );
}

  return (
    <>
      <Modal show={isOpen} onClose={handleClose} size="7xl" className="" >
        <Modal.Header>[{dataToCard?.default_code}] {dataToCard?.name}</Modal.Header>
        <Modal.Body className="grid sm:grid-cols-2 md:grid-cols-3 overflow-x-auto shadow-md sm:rounded-lg">
          <ImageUrl
            model="product.product"
            field="image_512"
            id={dataToCard?.id}
          />
          <div className="flex flex-col justify- p-4 leading-normal w-m-auto">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dataToCard?.description_sale}</h5>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
            <List >
              <List.Item icon={HiCheckCircle}>{`ID Product: ${dataToCard?.id}`}</List.Item>
              <List.Item icon={HiCheckCircle}>Precio: S/.{dataToCard?.lst_price} </List.Item>
              <List.Item icon={HiCheckCircle}>Stock: </List.Item>
              <div>
                {isError && <div>Error fetching stock information</div>}
                {isLoading && <Loading/>}
                {productStock && productStock.result && productStock.result.length > 0 ? (
                    productStock.result.map((stock, index) => (
                      <div key={index} className="text-base font-semibold leading-none text-gray-900 dark:text-white mb-1">
                            {`[${stock.location_id[1]}]: ${stock.quantity} ${stock.product_uom_id[1]}`}
                            <Popover content={ContentPopover(stock.company_id[1] ,stock.warehouse_id[1])} trigger="hover" key={index}>
                            <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button"><svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button>
                            </Popover>
                        </div>
                    ))
                ) : (
                    <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">***Sin información de Stock***</p>
                )}
              </div>
            </List>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          {/* <Button onClick={ handleClose}>I accept</Button> */}
          <Button color="red" onClick={ handleClose } onKeyUp={(ev) => {
              if (ev.key === "Enter") {
                handleClose();
              }
            }}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalCard.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  dataToCard: PropTypes.object,
  locationId: PropTypes.number
};
