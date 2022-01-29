import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import PageTransitionEffect from "./ProgressBar";
function Layout(props) {
  return (
    <div>
      <PageTransitionEffect />
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
