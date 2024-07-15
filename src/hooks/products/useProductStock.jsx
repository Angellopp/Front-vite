import { useQuery } from "react-query";
import getProductStock from "../../api/getProductStock";

export default function useProductStock(product_id, companies_ids) {
  return useQuery({ queryKey: ["productStock", {product_id, companies_ids}], 
        queryFn: async () => {
            const idLocation = 8;
            const response = await getProductStock(product_id, companies_ids);
            const results = response.result;

            // Mover el registro con location_id "PRCIX/Stock" al inicio de la lista
            const targetIndex = results.findIndex(record => record.location_id[0] === idLocation);
            if (targetIndex !== -1) {
                const [targetRecord] = results.splice(targetIndex, 1);
                results.unshift(targetRecord);
            }
            return {
                ...response,
                result: results
            };
        },
    });
}
