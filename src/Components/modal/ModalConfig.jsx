"use client";

import { Button, Modal, Label, Select } from "flowbite-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export function ModalConfig({ isOpen, handleClose }) {
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [visibleCompanies, setVisibleCompanies] = useState([]);
  const [renderKey, setRenderKey] = useState(0); // State to force re-render

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setCompanies(parsedUser?.companies ? Object.values(parsedUser.companies) : []);
      setSelectedCompany(parsedUser.current_company);
      setVisibleCompanies(parsedUser.available_companies_ids);
    }
  }, []);

  const handleCompanyChange = (e) => {
    const newSelectedCompany = parseInt(e.target.value);
    setSelectedCompany(newSelectedCompany);
    // Add the new selected company to visibleCompanies if not already there
    setVisibleCompanies((prevVisibleCompanies) => {
      if (!prevVisibleCompanies.includes(newSelectedCompany)) {
        return [...prevVisibleCompanies, newSelectedCompany];
      }
      return prevVisibleCompanies;
    });
    setRenderKey((prevKey) => prevKey + 1); // Force re-render
  };

  const handleCloseModal = () => {
    if (user) {
      setSelectedCompany(user.current_company);
      setVisibleCompanies(user.available_companies_ids);
    }
    handleClose();
  };

  const handleVisibleChange = (e) => {
    const { id } = e.target;
    if (parseInt(id) === selectedCompany) {
      return;
    }
    setVisibleCompanies((prevVisibleCompanies) => {
      if (prevVisibleCompanies.includes(parseInt(id))) {
        return prevVisibleCompanies.filter((companyId) => companyId !== parseInt(id));
      } else {
        return [...prevVisibleCompanies, parseInt(id)];
      }
    });
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        current_company: selectedCompany,
        available_companies_ids: visibleCompanies,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    handleClose();
  };

  return (
    <>
      <Modal show={isOpen} onClose={handleCloseModal} size="5xl" key={renderKey}>
        <Modal.Header>Ajustes</Modal.Header>
        <Modal.Body className="grid sm:grid-cols-2 md:grid-cols-3 overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-col p-4 leading-normal w-m-auto">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Compañías</h5>
            <div className="mb-2 block">
              <Label htmlFor="current_company" value="Seleccione Compañía Actual" />
            </div>
            <Select id="current_company" required value={selectedCompany || ''} onChange={handleCompanyChange}>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </Select>
            <div className="mb-2 block">
              <Label htmlFor="checkbox_companies" value="Compañías visibles" />
            </div>
            {Array.isArray(companies) && companies.length > 0 ? (
              <div className="flex max-w-md flex-col gap-4" id="checkbox_companies">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    <div className="flex items-center">
                      <input
                        id={company.id.toString()}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={company.id === selectedCompany || visibleCompanies.includes(company.id)}
                        onChange={handleVisibleChange}
                        disabled={company.id === selectedCompany}
                      />
                      <label htmlFor={company.id.toString()} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {company.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No companies available</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button color="green" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalConfig.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
