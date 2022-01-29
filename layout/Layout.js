import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import useToken from "../lib/auth/useToken";
function Layout(props) {
  const { user, loading, logout } = useToken();

  return (
    <div>
      <MainNavigation user={user} loading={loading} onLogout={logout} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
