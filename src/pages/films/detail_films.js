import React, { Component } from 'react';
import API from '../../services/api';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class DetailFilms extends Component {

	// initiate state
	constructor(props) {
		super(props);
		this.state = {
			films: [],
			isLoading: false,
      		error: null
		};
	}

	getAPI = () => {
		// show loading before getting data
	  this.setState({ isLoading: true });
	  // remove loading after getting data
		let title = this.props.match.params.title;
		API.getSingleFilms(title)
		.then( res => {
			// console.log(res.data.results);
			this.setState ({
				films: res.data.results[0],
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

		let _films = this.state.films;

		return (
			<section id="content" key={_films.title}>
				<div className="container">
					<div className="row">
               <div className="col-100">
                  <div className="card">
                    <div className="card-body">
                      <div className="div-txt-thumbnail">
                        <h2 className="title-films">{_films.title}</h2>
                      </div>
                      <div className="card-body">
                      <p className="txt-desc">
                      	{_films.opening_crawl}
                      </p>
                      <p>Episode ID : {_films.episode_id}
                      </p>
                      <p>Release Date : <Moment format="D MMMM YYYY" withTitle>{_films.release_date}</Moment>
                      </p>
                      <p>Director : {_films.director}
                      </p>
                      <p>Producer : {_films.producer}
                      </p>
                      </div>
                      <div className="card-footer">
                        <Link className="btn-1" to={`/films`}> <i className="fa fa-chevron-circle-left"></i> Back to films</Link>
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

export default DetailFilms;
