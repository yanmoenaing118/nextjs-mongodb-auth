import classes from "./MainNavigation.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

function MainNavigation({ user, loading, onLogout }) {
  const router = useRouter();

  function handleClick() {
    if (user) {
      return onLogout();
    }

    router.push("/login");
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <button onClick={handleClick}>
              {loading ? "" : user ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>

      <style jsx>{`
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
