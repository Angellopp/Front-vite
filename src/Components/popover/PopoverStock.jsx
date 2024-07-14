"use client";
import { Button, Popover } from "flowbite-react";
import PropTypes from "prop-types";
import useProductStock from "../../hooks/products/useProductStock";

export default function PopoverStock({ dataToPopover }) {
    // Obtener los datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const parsedCompaniesIds = userData && userData.available_companies_ids ? userData.available_companies_ids : [];
    const { data: productStock, isLoading, isError } = useProductStock(dataToPopover.id, parsedCompaniesIds || []);

    // Verificar si parsedCompaniesIds tiene contenido válido
    if (!parsedCompaniesIds || parsedCompaniesIds.length === 0) {
        return (
            <div>
                No companies available. Please check your settings.
            </div>
        );
    }

    // Llamar a useProductStock para obtener información de stock

    // Mostrar estado de carga
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Manejar errores en la obtención de stock
    if (isError) {
        return <div>Error fetching stock information</div>;
    }

    // Mostrar popover con la información de stock obtenida
    return (
        <Popover
            aria-labelledby="profile-popover"
            trigger="hover"
            content={
                <div className="w-64 p-3">
                    <p
                        id="profile-popover"
                        className="text-gray-500 dark:text-gray-400 font-semibold leading-none text-gray-900 mb-3"
                    >
                        Stock Information
                    </p>
                    <div>
                        {productStock && productStock.result && productStock.result.length > 0 ? (
                            productStock.result.map((stock, index) => (
                                <p key={index} className="text-base font-semibold leading-none text-gray-900 dark:text-white mb-1">
                                    {`[${stock.location_id[1]}]: ${stock.quantity} ${stock.product_uom_id[1]}`}
                                    <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button"><svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button>
                                </p>
                            ))
                        ) : (
                            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">***Sin información de Stock***</p>
                        )}
                    </div>
                </div>
            }
        >
            <Button>Ver Stock</Button>
        </Popover>
    );
}

PopoverStock.propTypes = {
    dataToPopover: PropTypes.object.isRequired
};

