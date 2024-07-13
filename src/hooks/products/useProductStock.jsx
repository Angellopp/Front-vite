import { useQuery } from "react-query";
import getProductStock from "../../api/getProductStock";

export default function useProductStock(product_id, companies_ids) {
  return useQuery({ queryKey: ["productStock", {product_id, companies_ids}], 
        queryFn: async () => {
            const data = await getProductStock(product_id, companies_ids);
            return data;
        },
    });
}
