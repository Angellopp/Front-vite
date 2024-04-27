import { useState, useEffect } from "react";
import Browser from "../Components/Browser";
import useProducts from "../hooks/products/useProducts";
import MySidebar from "../Components/navbar/MySidebar";

const ProductsDashboard = () => {
  const { data, isFetching, refetch, isFetched } = useProducts();
  const [products, setProducts] = useState(data);

  useEffect(() => {
    if (isFetched) setProducts(data);
  }, [isFetched, data]);

  return (
    <>
    <MySidebar />
    <div>
      {
        <Browser
          products={products}
          isFetching={isFetching}
          refetch={refetch}
        />
      }
    </div>
    </>
  );
};

export default ProductsDashboard;
