
"use client";

import { Button, Modal, List} from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import PropTypes from "prop-types"; // Importa PropTypes
import ImageUrl from "../image/ImageUrl";

export function ModalCard({ isOpen, handleClose, dataToCard }) {


  return (
    <>
      <Modal show={isOpen} onClose={handleClose} size="7xl" className="">
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
              <List.Item icon={HiCheckCircle}>Cantidad en inventario</List.Item>
            </List>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          {/* <Button onClick={ handleClose}>I accept</Button> */}
          <Button color="red" onClick={ handleClose }  >
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
};
