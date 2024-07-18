"use client";

import TOP from "./TOP";
import { Spinner, Button, TextInput, Select } from "flowbite-react";
import { HiSearch, HiViewGrid, HiTable } from "react-icons/hi";
import { useState , useEffect } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import useStockLocation from "../hooks/stockLocations/useStockLocation";

const Browser = ({ products, isFetching, refetch }) => {
  const [value, setValue] = useState("");
  const [locationId, setLocationId] = useState(0);
  const [locations, setLocations] = useState([]);
  const userData = localStorage.getItem("user");
  const parsedUser = JSON.parse(userData);
  const availableCompaniesIds = parsedUser.available_companies_ids
  const [tipeOfView, setTipeOfView] = useState("grid");

  const { data: stockLocations } = useStockLocation( "stock.location", "search_read",[[["active", "=", true],["usage","=","internal"]], ["complete_name","location_id","company_id","display_name"], 0, [], "id asc"] );

  useEffect(() => {
    if (stockLocations) {
      setLocations(stockLocations);
    }
  }, [stockLocations]);

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
      <div className="flex justify-center mt-3" >
          <Select id="location_id" className="ml-2" label="Location" onChange={(e) => setLocationId(e.target.value)}>
            <option value="0">Todas las ubicaciones</option>
            {locations && locations.map((location) => (
              availableCompaniesIds.includes(location.company_id[0]) &&
              <option key={location.id} value={location.id}>
                {location.display_name}
              </option>
            ))}
          </Select>
          <Button.Group outline>
            <Button color={tipeOfView === "table" ? "info" : "gray"} onClick={() => setTipeOfView("table")}><HiTable/></Button>
            <Button color={tipeOfView === "grid" ? "info" : "gray"} onClick={() => setTipeOfView("grid")}><HiViewGrid /></Button>
          </Button.Group>
      </div>
      <TOP value={value} products={products} locationId={parseInt(locationId)} typeOfView={tipeOfView}/>
    </div>
  );
};

Browser.propTypes = {
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
};
export default Browser;
