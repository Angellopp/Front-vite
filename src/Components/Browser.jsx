"use client";

import TOP from "./TOP";
import { Spinner, Button, TextInput, Select } from "flowbite-react";
import { HiSearch, HiViewGrid, HiTable } from "react-icons/hi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useStockLocation from "../hooks/stockLocations/useStockLocation";

const Browser = ({ products, isFetching, refetch }) => {
  const [value, setValue] = useState("");
  const [model, setModel] = useState("");
  const [locationId, setLocationId] = useState(0);
  const [locations, setLocations] = useState([]);
  const [typeOfView, setTypeOfView] = useState("grid");

  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : {};
  const availableCompaniesIds = parsedUser.available_companies_ids || [];

  const { data: stockLocations } = useStockLocation(
    "stock.location",
    "search_read",
    [
      [
        ["active", "=", true],
        ["usage", "=", "internal"],
      ],
      ["complete_name", "location_id", "company_id", "display_name"],
      0,
      [],
      "id asc",
    ]
  );

  useEffect(() => {
    if (stockLocations) {
      setLocations(stockLocations);
    }
  }, [stockLocations]);
  return (
    <div className="mx-auto">
      <div className="flex justify-center mt-3 mb-4">
        <TextInput className="mx-2"
          icon={HiSearch}
          type="search"
          placeholder="Buscar nombre"
          required
          size={32}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextInput className="mx-2"
          icon={HiSearch}
          type="search"
          placeholder="Buscar modelo"
          required
          size={15}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Button onClick={refetch} disabled={isFetching} className="mx-2">
          {isFetching ? (
            <Spinner color="success" aria-label="Success spinner example" />
          ) : (
            <div>Recargar</div>
          )}
        </Button>
      </div>
      <div className="flex justify-center mt-3 mb-4">
        <Select
          id="location_id"
          className="mx-2"
          label="Location"
          onChange={(e) => setLocationId(e.target.value)}
        >
          <option value="0">Todas las ubicaciones</option>
          {locations &&
            locations.map(
              (location) =>
                availableCompaniesIds.includes(location.company_id[0]) && (
                  <option key={location.id} value={location.id}>
                    {location.display_name}
                  </option>
                )
            )}
        </Select>
        <div className="flex flex-wrap gap-2 pl-2">
          <Button.Group>
            <Button
              color={typeOfView === "table" ? "info" : "gray"}
              onClick={() => setTypeOfView("table")}
            >
              <HiTable className="mr-2 h-5 w-5" />
            </Button>
            <Button
              color={typeOfView === "grid" ? "info" : "gray"}
              onClick={() => setTypeOfView("grid")}
            >
              <HiViewGrid className="mr-2 h-5 w-5" />
            </Button>
          </Button.Group>
        </div>
      </div>
      <TOP
        value={value}
        model={model}
        products={products}
        locationId={parseInt(locationId)}
        typeOfView={typeOfView}
      />
    </div>
  );
};

Browser.propTypes = {
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Browser;
