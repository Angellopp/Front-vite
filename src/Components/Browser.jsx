"use client";

import TOP from "./TOP";
import { Spinner, Button, TextInput, Select } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useState , useEffect } from "react";
import PropTypes from "prop-types"; // Importa PropTypes

const Browser = ({ products, isFetching, refetch }) => {
  const [value, setValue] = useState("");
  const [location, setLocation] = useState(0);
  const [locations, setLocations] = useState([]);

  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     const response = await fetch("/api/locations");
  //     const data = await response.json();
  //     setLocations(data);
  //   };
  //   fetchLocations();
  // }, []);

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
          <Select id="location_id" className="ml-2" label="Location" onChange={(e) => setLocation(e.target.value)}>
            <option value="0">Selecciona un Lugar</option>
            {locations && locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>
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
