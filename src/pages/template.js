import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';
import Home from './home/home';
import About from './about/about';
import Films from './films/films';
import Characters from './characters/characters';
import Vehicles from './vehicles/vehicles';

// function template
// define route & path
// added scroll to top component (global)
function Template() {
  return (

  	<Router>
  	<Menu/>
  	<div className="main-body">
	    <Route path="/" exact component={Home}/>
	    <Route path="/about" exact component={About}/>
	    <Route path="/films" exact component={Films}/>
      <Route path="/characters" exact component={Characters}/>
      <Route path="/vehicles" exact component={Vehicles}/>
    </div>
    <Footer/>
  	</Router>
  );
}

export default Template;