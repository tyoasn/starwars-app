import React, { Component } from 'react';
import API from '../../services/api';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom';

class DetailVehicles extends Component {

	// initiate state
	constructor(props) {
		super(props);
		this.state = {
			vehicles: [],
			isLoading: false,
      		error: null
		};
	}

	getAPI = () => {
		// show loading before getting data
	  this.setState({ isLoading: true });
	  // remove loading after getting data
		let title = this.props.match.params.title;
		API.getSingleVehicles(title)
		.then( res => {
			// console.log(res.data.results);
			this.setState ({
				vehicles: res.data.results[0],
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

		let _vehicles = this.state.vehicles;

		return (
			<section id="content">
				<div className="container">
					<div className="row">
		               <div className="col-100">
		                  <div className="card">
		                    <div className="card-body">
		                      <div className="div-txt-thumbnail">
		                        <h2 className="title-films">{_vehicles.name}</h2>
		                      </div>
		                      <div className="card-body">
		                      <p>Model : {_vehicles.model}
		                      </p>
		                      <p>Manufacturer : {_vehicles.manufacturer}
		                      </p>
		                      <p>Cost In Credits : {_vehicles.cost_in_credits}
		                      </p>
		                      <p>Length : {_vehicles.length}
		                      </p>
		                      <p>Max Atmosphering Speed : {_vehicles.max_atmosphering_speed}
		                      </p>
		                      <p>Crew : {_vehicles.crew}
		                      </p>
		                      <p>Passengers : {_vehicles.passengers}
		                      </p>
		                      <p>Cargo Capacity : {_vehicles.cargo_capacity}
		                      </p>
		                      <p>Consumables : {_vehicles.consumables}
		                      </p>
		                      <p>Vehicle Class : {_vehicles.vehicle_class}
		                      </p>
		                      </div>
		                      <div className="card-footer">
		                        <Link className="btn-1" to={`/vehicles`}> <i className="fa fa-chevron-circle-left"></i> Back to vehicles</Link>
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

export default DetailVehicles;
