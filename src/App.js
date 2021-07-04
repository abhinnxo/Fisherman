import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlayArea from "./pages/PlayArea";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/play" exact component={PlayArea} />
    </BrowserRouter>
  );
}

export default App;
