"use client";

import TOP from "./TOP";
import { Spinner, Button, TextInput } from "flowbite-react";

import { HiSearch } from "react-icons/hi";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Browser = ({ products, isFetching, refetch }) => {
  const [value, setValue] = useState("");

  return (
    <div className="mx-auto">
      <div className="flex justify-center mt-3">
          <TextInput
            icon={HiSearch}
            type="search"
            placeholder="Search"
            required
            size={32}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={1} // Número de filas del campo de texto
            cols={100} // Número de columnas del campo de texto
          />
          <Button onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? (
              <Spinner color="success" aria-label="Success spinner example" />
            ) : (
              <div>Recargar</div>
            )}
          </Button>
      </div>
      <TOP value={value} products={products} />
    </div>
  );
};

export default Browser;
