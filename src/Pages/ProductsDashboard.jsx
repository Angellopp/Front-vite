import { useState, useEffect } from "react";
import Browser from "../Components/Browser";
import useProducts from "../hooks/products/useProducts";

const ProductsDashboard = () => {
  const { data, isFetching, refetch, isFetched } = useProducts();
  const [products, setProducts] = useState(data);

  useEffect(() => {
    if (isFetched) setProducts(data);
  }, [isFetched, data]);

  return (
    <div className="">
      <div className="pt-20">
        {
          <Browser
            products={products}
            isFetching={isFetching}
            refetch={refetch}
          />
        }
      </div>
    </div>
  );
};

export default ProductsDashboard;
