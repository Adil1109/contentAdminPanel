import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from './logo.jpg';

const NavBar = () => {
	const auth = useAuth();
	return (
		<nav className='nav'>
			<div className='logo-div'>
				{!auth.signedIn ? (
					<img
						alt='cinemon-logo'
						className='logo'
						src={logo}
						height='50'
						width='50'
					/>
				) : (
					<NavLink to='/'>
						<img
							alt='cinemon-logo'
							className='logo'
							src={logo}
							height='50'
							width='50'
						/>
					</NavLink>
				)}
			</div>
			<div className='navlinks'>
				<span>
					{!auth.signedIn ? null : (
						<NavLink
							style={({ isActive }) => {
								return isActive ? { color: '#fbbb3f' } : {};
							}}
							className='nlink'
							to='/create-post'>
							Create Post
						</NavLink>
					)}
				</span>
				<span>
					{!auth.signedIn ? null : (
						<NavLink
							style={({ isActive }) => {
								return isActive ? { color: '#fbbb3f' } : {};
							}}
							className='nlink'
							to='/search-post'>
							Search
						</NavLink>
					)}
				</span>
			</div>
		</nav>
	);
};

export default NavBar;
