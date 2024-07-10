"use client";

import TOP from "./TOP";
import { Spinner, Button, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes

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

Browser.propTypes = {
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
};
export default Browser;
