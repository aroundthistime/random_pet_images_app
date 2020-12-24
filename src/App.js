import React from "react";
import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Dogs from "./routes/Dogs";

const App = () => {
  return (<HashRouter>
    <Route path="/" exact={true} component={Dogs}></Route>
  </HashRouter>
  )
}

export default App;
