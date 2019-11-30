import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../../services/api';
import Loader from '../../components/loader/loader';
import { withRouter, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';



class Vehicles extends Component {

    // initiate state
    constructor(props) {
      super(props);
      this.state = {
        searchString: "",
        vehicles: [],
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
      API.getVehicles()
          .then((res)=>{
           // console.log(res.data.results);
           this.setState({
             vehicles: res.data.results,
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
        vehicles: this.state.vehicles
      });
      this.refs.search.focus();
      this.getAPI();
    }

    fetchData = () => {
      if (this.state.vehicles.length >= this.state.limit) {
      this.setState({ hasMore: false });
      return;
      }
      const { page, start } = this.state;
      this.setState({ start: this.state.start + page });
      API.getVehiclesPaginate(start)
      .then(res =>
        this.setState({ vehicles: this.state.vehicles.concat( res.data.results) })
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

      let _vehicles = this.state.vehicles;
      let search = this.state.searchString.trim().toLowerCase();

      if (search.length > 0) {
        _vehicles = _vehicles.filter(function(vehicles_item) {
          // return films_item.title.toLowerCase().match(search);
          return vehicles_item.name.toLocaleLowerCase().indexOf(search) !== -1;
        });
      }

      return (
        <section id="content">
    			<div className="container">
            <div className="text-center">
              <h1>Vehicles</h1>
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
                    placeholder="Search by name..."
                  />
                  <i className="fa fa-search search-icon"></i>
                </div>
              </div>
              <div className="row">
              <InfiniteScroll
                dataLength={this.state.vehicles.length}
                next={this.fetchData}
                hasMore={this.state.hasMore}
                loader={<div className="container text-center"><h1>Loading...</h1></div>}
                endMessage={<div className="container text-center"><h1>All data loaded.</h1></div>}
              >
              {_vehicles.map(i => {
                return (
                <div className="col-50" key={i.name}>
                  <div className="card">
                    <div className="card-body">
                      <div className="div-txt-thumbnail">
                        <h2 className="title-films">{i.name}</h2>
                      </div>
                      <div className="card-body">
                        <p className="txt-desc"><i className="fa fa-cog"></i> {i.vehicle_class}</p>
                        <p className="txt-desc"> <i className="fa fa-building"></i> {i.manufacturer}</p>
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

export default withRouter(Vehicles);
