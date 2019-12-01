import React, { Component } from 'react';
import API from '../../services/api';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom';

class DetailCharacters extends Component {

	// initiate state
	constructor(props) {
		super(props);
		this.state = {
			characters: [],
			isLoading: false,
      		error: null
		};
	}

	getAPI = () => {
		// show loading before getting data
	  this.setState({ isLoading: true });
	  // remove loading after getting data
		let title = this.props.match.params.title;
		API.getSingleCharacters(title)
		.then( res => {
			// console.log(res.data.results);
			this.setState ({
				characters: res.data.results[0],
				isLoading: false
			})
		})
		.catch(error => this.setState({
          error,
          isLoading: false
        }));
	}

	componentDidMount() {
		this.getAPI();
	}

	render() {

		// loading & error handling
	  const { isLoading, error } = this.state;
	    if (error) {
	      return <section id="content"><div className="container text-center"><h1>Error!</h1></div></section>;
	    }
	    if (isLoading) {
	      return <Loader/>;
	    }

		let _characters = this.state.characters;

		return (
			<section id="content">
				<div className="container">
					<div className="row">
		               <div className="col-100">
		                  <div className="card">
		                    <div className="card-body">
		                      <div className="div-txt-thumbnail">
		                        <h2 className="title-films">{_characters.name}</h2>
		                      </div>
		                      <div className="card-body">
		                      <p>Birth Year : {_characters.birth_year}
		                      </p>
		                      <p>Gender : {_characters.gender}
		                      </p>
		                      <p>Height : {_characters.height} cm
		                      </p>
		                      <p>Mass : {_characters.mass} kg
		                      </p>
		                      <p>Hair Color : {_characters.hair_color}
		                      </p>
		                      <p>Skin Color : {_characters.skin_color}
		                      </p>
		                      <p>Eye Color : {_characters.eye_color}
		                      </p>
		                      </div>
		                      <div className="card-footer">
		                        <Link className="btn-1" to={`/characters`}> <i className="fa fa-chevron-circle-left"></i> Back to characters</Link>
		                      </div>
		                    </div>
		                  </div>
		                  </div>
					</div>
				</div>
			</section>
		)
	}
}

export default DetailCharacters;
