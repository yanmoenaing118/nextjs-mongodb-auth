import useSWR from "swr";
import { fetcher } from "./fetcher";

export default function useMeetups() {
    const {data, error} = useSWR("/api/meetups", fetcher);

    return {
        meetups: data,
        loading: !data && !error,
        error
    }
}