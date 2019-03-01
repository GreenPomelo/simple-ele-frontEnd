import React from "react";
import Index from "./index/Index";
import { BrowserRouter, Route } from 'react-router-dom';

// import { Router, Route, browserHistory } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Index />
      </Route>
    </BrowserRouter>
  );
}

export default App;
