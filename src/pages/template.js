import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';
import Home from './home/home';
import About from './about/about';
import Films from './films/films';
import DetailFilms from './films/detail_films';
import Characters from './characters/characters';
import DetailCharacters from './characters/detail_characters';
import Vehicles from './vehicles/vehicles';
import DetailVehicles from './vehicles/detail_vehicles';
import Gallery from './gallery/gallery';
import SimpleReactLightbox from "simple-react-lightbox";

// function template
// define route & path
export default class Template extends Component {

  render() {
    const NoMatchPage = () => {
      return (
        <section id="content">
          <div className="container text-center">
            <h1>404</h1>
            <h4>The Page You're Looking For Is Not Exist In This Universe!</h4>
          </div>
        </section>
        );
      };

  return (
    <SimpleReactLightbox>
  	<Router>
  	<Menu/>
  	<div className="main-body">
    <Switch>
	    <Route path="/" exact component={Home}/>
	    <Route path="/about" exact component={About}/>
	    <Route path="/films" exact component={Films}/>
      <Route path="/films/:title" component={DetailFilms}/>
      <Route path="/characters" exact component={Characters}/>
      <Route path="/characters/:title" component={DetailCharacters}/>
      <Route path="/vehicles" exact component={Vehicles}/>
      <Route path="/vehicles/:title" component={DetailVehicles}/>
      <Route path="/gallery" exact component={Gallery}/>
      <Route component={NoMatchPage} />
    </Switch>
    </div>
    <Footer/>
  	</Router>
    </SimpleReactLightbox>
  );
}

}