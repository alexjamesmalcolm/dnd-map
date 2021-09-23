import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Guest from "./pages/Guest";
import Owner from "./pages/Owner";

const App = () => (
  <Router>
    <Switch>
      <Route path="/:brokerId">
        <Guest />
      </Route>
      <Route path="/">
        <Owner />
      </Route>
    </Switch>
  </Router>
);

export default App;
