import React, {Component} from 'react';
import './footer.css';
import LogoFooter from './star-wars-logo.png';

class Footer extends Component {

	render() {
		return (
			<div className="footer-container text-center">
				<a href="http://tyoasn.com">
					<img className="logo-footer" src={LogoFooter} alt="tyoasn"/>
				</a>
			</div>

			)
	}
}

export default Footer;
