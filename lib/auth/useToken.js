import router from "next/router";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export default function useToken() {
  const { data, error, mutate } = useSWR("/api/auth", fetcher);

  async function logout() {
    mutate(
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
    );
  }
  return {
    loading: !data && !error,
    user: data?.user,
    token: data?.token,
    logout,
    mutate,
  };
}
