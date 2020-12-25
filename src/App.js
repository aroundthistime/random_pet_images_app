import React from "react";
import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Dogs from "./routes/Dogs";
import Cats from "./routes/Cats";

const App = () => {
  return (<HashRouter>
    <Route path="/" exact={true} component={Dogs}></Route>
    <Route path="/dogs" component={Dogs}></Route>
    <Route path="/cats" component={Cats}></Route>
  </HashRouter>
  )
}

export default App;
