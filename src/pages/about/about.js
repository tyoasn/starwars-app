import React, {Component} from 'react';
import './about.css';

class About extends Component {

	render() {
		return (
			<section id="content">
				<div className="container text-center">
					<h1 className="text-yellow">About</h1>
					<p className="text-about">
						The Star Wars API, or "swapi" (Swah-pee) is the world's first quantified and programmatically-accessible data source for all the data from the Star Wars canon universe!
					</p>
					<p className="text-about">
						We've taken all the rich contextual stuff from the universe and formatted into something easier to consume with software. Then we went and stuck an API on the front so you can access it all!
					</p>
				</div>
			</section>

			)
	}
}

export default About;