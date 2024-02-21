import { useQuery } from "react-query";
import fetchProducts from "../../api/fetchProducts";

export default function useProducts() {
    
    return useQuery({ queryKey: ["products"], queryFn: fetchProducts, refetchOnMount: true, refetchOnWindowFocus: false, placeholderData: [ { id: 0, name: "Cargando...", lst_price: 0, image:"" }], refetchInterval: 1000*60*60, refetchIntervalInBackground: true });
}