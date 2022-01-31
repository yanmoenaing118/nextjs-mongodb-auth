import { withSessionSsr } from "../lib/session";
import useToken from "../lib/auth/useToken";
import Link from "next/link";
export default function AccountSsr({ user }) {
  const { token } = useToken();

  if (!token) {
    return (
      <Link href="/login">
        <a>Login to manage your account</a>
      </Link>
    );
  }

  return (
    <div>
      <h1>SSR profile page</h1>
      <div>
        name: <strong>{user.name}</strong>
      </div>
      <div>
        email: <strong>{user.email}</strong>
      </div>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
});
