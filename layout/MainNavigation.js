import Link from "next/link";
import router from "next/router";
import useToken from "../lib/auth/useToken";
import { AiOutlineMenuFold , AiOutlineClose} from "react-icons/ai";
import { useState } from "react";

function MainNavigation() {
  const { token, loading, logout } = useToken();
  const [show, setShow] = useState("false");

  async function handleClick() {
    if (token) {
      return await logout();
    }
    router.push("/login");
  }

  console.log(show);

  return (
    <header className="header">
      <div className="logo" onClick={() => router.push("/")}>
        My love
      </div>
      <nav>
        <MobileNavigation
          loading={loading}
          handleClick={handleClick}
          token={token}
          show={show}
          setShow={setShow}
        />
        <DesktopNavigation
          loading={loading}
          handleClick={handleClick}
          token={token}
        />
      </nav>
      <div className="menu">
        <AiOutlineMenuFold onClick={() => setShow("true")} />
      </div>
      <style jsx>{`
        .logo {
          cursor: pointer;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .menu {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
        }
        @media screen and (min-width: 780px) {
          .menu {
            display: none;
          }
        }
        header {
          height: 70px;
          display: flex;
          justify-content: space-between;
          padding: 0 3em;
          align-items: center;
          position: relative;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </header>
  );
}

function DesktopNavigation({ loading, handleClick, token }) {
  return (
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
          <button onClick={() => router.push("/account")}>profile(SSG)</button>
          <button onClick={() => router.push("/account-ssr")}>
            profile(SSR)
          </button>
        </li>
      )}

      {!loading && (
        <li>
          <button onClick={handleClick}>{token ? "Logout" : "Login"}</button>
        </li>
      )}
      <style jsx>{`
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

        @media screen and (max-width: 780px) {
          ul {
            display: none;
          }
        }
      `}</style>
    </ul>
  );
}

function MobileNavigation({ loading, handleClick, token, setShow , show}) {
  
  return (
    <ul data-show={show}>
      <li onClick={() => setShow("false")}>
        <AiOutlineClose  onClick={() => setShow("false")} />        
      </li>
      <li onClick={() => setShow("false")}>
        <Link href="/">
          <a>All Records</a>
        </Link>
      </li>
      <li onClick={() => setShow("false")}>
        <Link href="/new-meetup">
          <a>New Record</a>
        </Link>
      </li>
      {!loading && token && (
        <li onClick={() => setShow("false")}>
          <button onClick={() => router.push("/account")}>profile(SSG)</button> |
          <button onClick={() => router.push("/account-ssr")}>
            profile(SSR)
          </button>
        </li>
      )}
      {!loading && (
        <li onClick={() => setShow("false")}>
          <button onClick={handleClick}>{token ? "Logout" : "Login"}</button>
        </li>
      )}

      <style jsx>{`
        ul {

          position: fixed;
          top: 0;
          left: -100%;
          width: 50vw;
          height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
          list-style: none;
          margin: 0;
          border-right: 1px solid #ccc;
          transition: all .3s ease;
        }

        ul[data-show="true"] {
          left: 0;
        }

        ul li:first-child {
          align-self: flex-end;
          margin-right: 1rem;
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
    </ul>
  );
}

export default MainNavigation;
