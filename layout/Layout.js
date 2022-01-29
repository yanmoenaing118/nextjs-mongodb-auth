import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import useToken from "../lib/auth/useToken";
function Layout(props) {
  return (
    <div>
      <MainNavigation
        token={false}
        onLogout={() => {
          console.log("logout");
        }}
      />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
