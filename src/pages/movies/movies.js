import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './movies.css';
import Moment from 'react-moment';
import API from '../../services/api';
import Loader from '../../components/loader/loader';
import { withRouter, Link } from 'react-router-dom';


class Movies extends Component {

    // initiate state
    constructor(props) {
      super(props);
      this.state = {
        searchString: "",
        movies: [],
        isLoading: false,
        error: null,
      };
      this.handleChange = this.handleChange.bind(this);
    }

    // get data from api
    getAPI = () => {
      // show loading before getting data
      this.setState({ isLoading: true });
      // remove loading after getting data
      API.getMovies()
          .then((res)=>{
           // console.log(res.data.results);
           this.setState({
             movies: res.data.results,
             isLoading: false
           })
       })
       .catch(error => this.setState({
             error,
             isLoading: false
           }));
    }

    componentDidMount() {
      this.setState({
        movies: this.state.movies
      });
      this.refs.search.focus();
      this.getAPI();
    }

    handleChange() {
      this.setState({
        searchString: this.refs.search.value
      });
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

      let _movies = this.state.movies;
      let search = this.state.searchString.trim().toLowerCase();

      if (search.length > 0) {
        _movies = _movies.filter(function(movies_item) {
          // return movies_item.title.toLowerCase().match(search);
          return movies_item.title.toLocaleLowerCase().indexOf(search) !== -1;
        });
      }

      return (
        <section id="content">
    			<div className="container">
            <div className="text-center">
              <h1>Star Wars Films</h1>
              {this.state.error &&
                <h4>Error!</h4> 
              }
              {this.state.isEmpty &&
                <h4>Data Not Found!</h4> 
              }
            </div>
              <div className="text-center">
                <div className="search-bar">
                  <input
                    type="text"
                    className="input-bar"
                    value={this.state.searchString}
                    ref="search"
                    onChange={this.handleChange}
                    placeholder="Search title..."
                  />
                  <i className="fa fa-search search-icon"></i>
                </div>
              </div>
              <div className="row">
              {_movies.map(i => {
                return (
                <div className="col-50" key={i.episode_id}>
                  <div className="card">
                    <div className="card-body">
                      <div className="div-txt-thumbnail">
                        <h2 className="title-movie">{i.title}</h2>
                        <span><i className="fa fa-calendar"></i> <Moment format="D MMMM YYYY" withTitle>{i.release_date}</Moment></span>
                      </div>
                      <div className="card-body">
                        <p className="txt-desc">{i.opening_crawl}</p>
                      </div>
                      <div className="card-footer">
                        <NavLink className="btn-1" to="/">See Detail <i className="fa fa-film"></i></NavLink>
                      </div>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>
      );
    }
  }

export default withRouter(Movies);
