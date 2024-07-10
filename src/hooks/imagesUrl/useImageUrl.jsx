import { useQuery } from "react-query";
import getImageUrl from "../../api/getImageUrl";

export default function useImageUrl(model, field, id) {
    return useQuery({
        queryKey: ["imageUrl", { model, field, id }],
        queryFn: async () => {
            const data = await getImageUrl(model, field, id);
            return data;
        },
        refetchOnMount: true,
        // placeholderData: "",
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
        refetchIntervalInBackground: true,
    });
}