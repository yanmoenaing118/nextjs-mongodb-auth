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
      <div className="logo">React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
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
