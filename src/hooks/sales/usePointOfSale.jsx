import { useQuery } from "react-query";
import postJrpc from "../../api/postJrpc";

export default function usePointOfSale(model = "pos.session" , method = "search_read", args) {
  return useQuery({
    queryKey: ["posSession", {args}],
    queryFn: async () => {
      const response = await postJrpc({
        model: model,
        method: method,
        args: args,
      });
      return response;
    },
    // refetchOnMount: true,
    // refetchOnWindowFocus: false,
    // placeholderData: [{ id: 0, name: "Cargando...", lst_price: 0, image: "" }],
    // refetchInterval: 1000 * 60 * 30,
    // refetchIntervalInBackground: true,
  });
}
