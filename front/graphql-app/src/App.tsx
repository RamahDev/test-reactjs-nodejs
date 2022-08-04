import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { connect } from "react-redux";
import mapStateToProps from "./services/redux/mapStateToProps";
import mapDispatchToProps from "./services/redux/mapDispatchToProps";
// import AuthHome from "./views/AuthHome";

function App(props: any) {
  // console.log({auth: props.auth});
  // if(!props?.auth?.isAuth) {
  //   return <AuthHome />
  // }

  const renderSwitch = (rt: Array<any>) => {
    const res = rt.map((route: any, idx: number) => (
      <Route exact path={route.path} component={route.component} key={idx} />
    ));
    return res;
  };

  const defaultRoutes: any[] = [];

  return (
    <div className="App">
      <Router>
        <div>
          <Switch>{renderSwitch(defaultRoutes)}</Switch>
        </div>
      </Router>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

