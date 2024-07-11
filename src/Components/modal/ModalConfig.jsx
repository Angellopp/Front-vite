"use client";

import { Button, Modal, Checkbox, Label } from "flowbite-react";
import PropTypes from "prop-types"; // Importa PropTypes

export function ModalConfig({ isOpen, handleClose, dataToCard }) {
  // eslint-disable-next-line no-unused-vars
  const datatoCard = dataToCard;
  const user = JSON.parse(localStorage.getItem("user"));
  const companies = user?.companies ? Object.values(user.companies) : [];
  console.log("User:", user);
  console.log(companies);

  return (
    <>
      <Modal show={isOpen} onClose={handleClose} size="5xl" className="">
        <Modal.Header>Ajustes</Modal.Header>
        <Modal.Body className="grid sm:grid-cols-2 md:grid-cols-3 overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-col justify- p-4 leading-normal w-m-auto">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Compañías</h5>
            {Array.isArray(companies) && companies.length > 0 ? (
              <div className="flex max-w-md flex-col gap-4" id="checkbox">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    <Checkbox id={company.id.toString()} />
                    <Label htmlFor={company.id.toString()} className="flex">
                      {company.name}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No companies available</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={handleClose}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalConfig.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  dataToCard: PropTypes.object,
};