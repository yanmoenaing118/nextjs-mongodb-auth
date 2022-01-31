import useSWR from "swr";

import { fetcher } from "./../lib/fetcher";
import useToken from "./../lib/auth/useToken";
import Link from "next/link";

export default function AccountPage() {
  const { token } = useToken();
  const { data } = useSWR(token ? "/api/account" : null, fetcher);

  if (!token) {
    return (
      <Link href="/login">
        <a>Login to manage your account</a>
      </Link>
    );
  }

  if (!data) {
    return <div>loading....</div>;
  }
  return (
    <div>
      <h1>SSG profile page</h1>
      <div>
        name: <strong>{data.name}</strong>
      </div>
      <div>
        email: <strong>{data.email}</strong>
      </div>
    </div>
  );
}
