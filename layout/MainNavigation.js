import Link from "next/link";
import { useRouter } from "next/router";
import useToken from "../lib/auth/useToken";

function MainNavigation() {
  const router = useRouter();

  const { token, loading, logout } = useToken();

  async function handleClick() {
    if (token) {
      return await logout();
    }
    router.push("/login");
  }

  return (
    <header className="header">
      <div className="logo">My love</div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>All Records</a>
            </Link>
          </li>
          <li>
            <Link href="/new-meetup">
              <a>New Record</a>
            </Link>
          </li>
          {!loading && token && (
            <li>
              <button onClick={() => router.push("/account")}>
                profile(SSG)
              </button>
              <button onClick={() => router.push("/account-ssr")}>
                profile(SSR)
              </button>
            </li>
          )}
          <li>
            {!loading && (
              <button onClick={handleClick}>
                {token ? "Logout" : "Login"}
              </button>
            )}
          </li>
        </ul>
      </nav>

      <style jsx>{`
        header {
          height: 70px;
          display: flex;
          justify-content: space-between;
          padding: 0 3em;
          align-items: center;

          box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
        }

        ul {
          display: flex;
          list-style: none;
          align-items: center;
        }

        ul li {
          margin: 0.55em;
        }
        ul li a {
          font-size: 0.9rem;
          transition: all 0.1s ease;
          padding: 0.3em;
        }

        ul li a:hover {
          box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
        }
        button {
          border: none;
          background: #fff;
          color: #444;
          padding: 0.5em;
          shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      `}</style>
    </header>
  );
}

export default MainNavigation;
