"use client";

import { Checkbox, Table } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import PropTypes from "prop-types"; // Importa PropTypes
import PopoverStock from "../popover/PopoverStock";
import ImageUrl from "../image/ImageUrl";
// import { useState, useEffect } from "react";

export default function ProductTable({ currentItems, locationId, openModal, setDataToCard }) {
  return (
    <div className="overflow-x-auto p-5">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Imagen</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">
              Ver <HiEye />{" "}
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentItems &&
            currentItems.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  [{item.default_code}] {item.name}
                </Table.Cell>
                <Table.Cell>
                  <PopoverStock
                    dataToPopover={item}
                    locationId={parseInt(locationId)}
                  />
                </Table.Cell>
                <Table.Cell>{item.lst_price}</Table.Cell>
                <Table.Cell onClick={() => { openModal(true); setDataToCard(item); }}>
                    {/* Imagen de 3em x 3em */}
                    <div className="w-20 h-20">
                  <ImageUrl
                    model="product.product"
                    field="image_128"
                    id={item.id}
                    alt={item.name}
                  />
                </div>
                </Table.Cell>
                <Table.Cell onClick={() => { openModal(true); setDataToCard(item); }}>
                  <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" >
                    Ver <HiEye />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

ProductTable.propTypes = {
  currentItems: PropTypes.array,
  locationId: PropTypes.number,
  openModal: PropTypes.func,
  setDataToCard: PropTypes.func
};
