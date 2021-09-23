import Example from "./Example";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Example />
      </Route>
    </Switch>
  </Router>
);

export default App;
