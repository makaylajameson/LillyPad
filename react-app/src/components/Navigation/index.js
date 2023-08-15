import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo/lillypad.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	const handleLogoClick = () => {
		history.push('/');
	};

	return (
		<div className='navigation-header'>
			<div>
				<NavLink exact to="/" activeClassName="active-link" onClick={handleLogoClick}>
					<img src={logo} className="logo" />
				</NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
