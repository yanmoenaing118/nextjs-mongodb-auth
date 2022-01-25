import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import useAuth from "./../../lib/auth/useAuth";
function Layout(props) {
  const { user, loading, logout } = useAuth();

  return (
    <div>
      <MainNavigation user={user} loading={loading} onLogout={logout} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
