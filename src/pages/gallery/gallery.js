import React, { Component, Fragment } from 'react';
import API from '../../services/api';
import Moment from 'react-moment';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom';
import './gallery.css';
import { SRLWrapper } from "simple-react-lightbox";

class DetailGallery extends Component {

	// initiate state
	constructor(props) {
			super(props);
			this.state = {
				gallery: [
					{
						id: 1,
						gallery_photo_name: "David Prowse and Leslie Schofield in Star Wars (1977)",
						media: "https://m.media-amazon.com/images/M/MV5BMTk3MTkzNTk3Ml5BMl5BanBnXkFtZTgwOTcyMzQyNDM@._V1_SY1000_CR0,0,1306,1000_AL_.jpg"
					},
					{
						id: 2,
						gallery_photo_name: "Carrie Fisher, Peter Cushing, and David Prowse in Star Wars (1977)",
						media: "https://m.media-amazon.com/images/M/MV5BMjA4OTEwNDM2Nl5BMl5BanBnXkFtZTgwNTcyMzQyNDM@._V1_SY1000_CR0,0,1511,1000_AL_.jpg"
					},
					{
						id: 3,
						gallery_photo_name: "Mark Hamill in Star Wars (1977)",
						media: "https://m.media-amazon.com/images/M/MV5BMTk3MDkyNzA1OV5BMl5BanBnXkFtZTgwNjcyMzQyNDM@._V1_SY1000_CR0,0,1512,1000_AL_.jpg"
					},
					{
						id: 4,
						gallery_photo_name: "Harrison Ford in Star Wars (1977)",
						media: "https://m.media-amazon.com/images/M/MV5BNTM0OTQ4MDA3M15BMl5BanBnXkFtZTgwMDg1NjQ1MDI@._V1_SX1334_CR0,0,1334,999_AL_.jpg"
					}

				],
				isLoading: false,
	      error: null
			};
	}


	render() {

	let _gallery = this.state.gallery;

		// loading & error handling
	  const { isLoading, error } = this.state;
	    if (error) {
	      return <section id="content"><div className="container text-center"><h1>Error!</h1></div></section>;
	    }
	    if (isLoading) {
	      return <Loader/>;
	    }

		return (
			<Fragment>
				<section id="content">
					<SRLWrapper>
		  			<div className="container">
		  		    	<div className="row">
							{_gallery.map( i => (
								<div className="col-50" key={i.id}>
									 <div className="img-event-container">
											<img src={i.media} className="img-gallery" alt={i.gallery_photo_name} />
									 </div>
								</div>
							))}
							</div>
						</div>
					</SRLWrapper>
				</section>
			</Fragment>
		)
	}
}

export default DetailGallery;
