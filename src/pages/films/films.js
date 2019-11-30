import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './films.css';
import Moment from 'react-moment';
import API from '../../services/api';
import Loader from '../../components/loader/loader';
import { withRouter, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


class Films extends Component {

    // initiate state
    constructor(props) {
      super(props);
      this.state = {
        searchString: "",
        films: [],
        page: 1,
        start: 2,
        limit:'',
        isEmpty: true,
        hasMore: true,
        isLoading: false,
        error: null,
      };
      this.handleChange = this.handleChange.bind(this);
    }

    // get data from api
    getAPI = () => {
      // show loading before getting data
      this.setState({ isLoading: true });
      const { page, start } = this.state;
      // remove loading after getting data
      API.getFilms()
          .then((res)=>{
           // console.log(res.data.results);
           this.setState({
             films: res.data.results,
             limit: res.data.count,
             isLoading: false,
             isEmpty: false
           })
       })
       .catch(error => this.setState({
             error,
             isLoading: false,
             isEmpty: true
           }));
    }

    componentDidMount() {
      this.setState({
        films: this.state.films
      });
      this.refs.search.focus();
      this.getAPI();
    }

    fetchData = () => {
      if (this.state.films.length >= this.state.limit) {
      this.setState({ hasMore: false });
      return;
      }
      const { page, start } = this.state;
      this.setState({ start: this.state.start + page });
      API.getFilmsPaginate(start)
      .then(res =>
        this.setState({ films: this.state.films.concat( res.data.results) })
      );
    };

    handleChange() {
      this.setState({
        searchString: this.refs.search.value
      });
    }


    render() {

      // loading
      const {isLoading} = this.state;
      
        if (isLoading) {
          return <Loader/>;
        }

      let _films = this.state.films;
      let search = this.state.searchString.trim().toLowerCase();

      if (search.length > 0) {
        _films = _films.filter(function(films_item) {
          // return films_item.title.toLowerCase().match(search);
          return films_item.title.toLocaleLowerCase().indexOf(search) !== -1;
        });
      }

      return (
        <section id="content">
    			<div className="container">
            <div className="text-center">
              <h1>Films</h1>
              {this.state.error &&
                <section id="content"><div className="container text-center"><h1>Error!</h1></div></section>
              }
              {this.state.isEmpty &&
                <section id="content"><div className="container text-center"><h1>Data Not Found!</h1></div></section>
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
                    placeholder="Search by title..."
                  />
                  <i className="fa fa-search search-icon"></i>
                </div>
              </div>
              <div className="row">
              <InfiniteScroll
                dataLength={this.state.films.length}
                next={this.fetchData}
                hasMore={this.state.hasMore}
                loader={<div className="container text-center"><h1>Loading...</h1></div>}
                endMessage={<div className="container text-center"><h1>All data loaded.</h1></div>}
              >
              {_films.map(i => {
                return (
                <div className="col-50" key={i.episode_id}>
                  <div className="card">
                    <div className="card-body">
                      <div className="div-txt-thumbnail">
                        <h2 className="title-films">{i.title}</h2>
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
               </InfiniteScroll>
            </div>
          </div>

        </section>
      );
    }
  }

export default withRouter(Films);
