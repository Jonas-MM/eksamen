import React from 'react';

//routes
import { BrowserRouter, Route, Switch } from "react-router-dom";


//navbar
import Navbar from './components/Navbar/Navbar';

//pages
import Home from './components/Pages/Home';
import Side1 from './components/Pages/Side1';
import Side2 from './components/Pages/Side2';
import Side3 from './components/Pages/Side3';
import Side4 from './components/Pages/Side4';
import Side5 from './components/Pages/Side5';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          {/* <Home /> */}
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/side1" component={Side1} />
            <Route path="/side2" component={Side2} />
            <Route path="/side3" component={Side3} />
            <Route path="/side4" component={Side4} />
            <Route path="/side5" component={Side5} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
