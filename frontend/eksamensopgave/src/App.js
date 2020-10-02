import React from "react";

//routes
import { BrowserRouter, Route, Switch } from "react-router-dom";

//navbar
import Navbar from "./components/Navbar/Navbar";

//pages
import Home from "./components/Pages/Home/Home";
import SpecificProduct from "./components/Pages/SpecificProduct/SpecificProduct";
import Prpdukter from "./components/Pages/Produkter/Produkter";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Login/Register";
import Kontakt from "./components/Pages/Kontakt/Kontakt";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Home /> */}
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/produkter" component={Prpdukter} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <Route path="/side4" component={Side4} /> */}
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/:id" component={SpecificProduct} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
