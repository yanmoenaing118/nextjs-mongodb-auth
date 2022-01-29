import router from "next/router";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export default function useToken() {
  const { data, error } = useSWR("/api/auth", fetcher, {
    revalidateOnFocus: false,
  });

  async function logout() {
    const result = await fetch("/api/auth/logout");
    router.push("/");
  }
  return {
    loading: !data && !error,
    user: data?.user,
    token: data?.token,
    logout,
  };
}
