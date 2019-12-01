import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './about.css';

class About extends Component {

	render() {
		return (
			<section id="content">
				<div className="container text-center">
					<h1 className="text-yellow">About This App</h1>
					<p className="text-about">
						The Star Wars React App is an application built with <b>ReactJS</b> and <b>SWAPI</b> (Star Wars API).
					</p>
					<p className="text-about">
						All the data is accessible through <b>SWAPI</b> HTTP web API.
					</p>
				</div>
				<div className="container text-center m-20">
  					<NavLink className="btn-1" to="/films">Films <i className="fa fa-arrow-circle-o-right"></i></NavLink>
  				</div>
  				<div className="container text-center m-20">
  					<NavLink className="btn-1" to="/characters">Characters <i className="fa fa-arrow-circle-o-right"></i></NavLink>
  				</div>
  				<div className="container text-center m-20">
  					<NavLink className="btn-1" to="/vehicles">Vehicles <i className="fa fa-arrow-circle-o-right"></i></NavLink>
  				</div>
			</section>

			)
	}
}

export default About;