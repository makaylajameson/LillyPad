import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import logo from './logo/lillypad.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef(null);
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenuHandler = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenuHandler);

        return () => document.removeEventListener("click", closeMenuHandler);
    }, [showMenu]);

    const handleLogoClick = () => {
        history.push('/');
    };

    return (
        <>
            {isLoaded && (
                <div className='navigation-header'>
                    {sessionUser ? (
                        <div>
                            <NavLink exact to="/" activeClassName="active-link" onClick={handleLogoClick}>
                                <img src={logo} className="logo" alt="Logo" />
                            </NavLink>
                            <ProfileButton user={sessionUser} />
                        </div>
                    ) : (
                        <div className='login-signup-modal'>
                            <div className='log-in-modal'>
                                <OpenModalButton
                                    buttonText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </div>
                            <div className='sign-up-modal'>
                                <OpenModalButton
                                    buttonText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Navigation;
