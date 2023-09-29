import React, { useEffect, useState, useRef } from 'react';
import Feature from './toggleFeature';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from "../SignupFormModal";
import Footer from '../footer';
import './SplashPage.css';


function SplashPage() {

    const ulRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
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


    return (
        <div className='sign-up-container'>
            <div className='sign-up-inner-container'>
                <div className='intro-img-container'>

                    <div className=''>
                        <div id='line1'></div>
                        <div>
                            <p className='p1'>
                                LillyPad brings all your
                                tasks, teammates,
                                and tools together
                            </p>

                            <p className='p2'>
                                Keep everything in the same place-even if your team isn't.
                            </p>
                        </div>

                        <div className='sign-up-modal'>
                            <OpenModalButton
                                buttonText="Sign up - it's free!"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </div>

                    <img alt='' className='copy-request-img' src='https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp' />
                </div>

                {/* <img alt='' className='wave-bar-img' src='https://images.ctfassets.net/rz1oowkt5gyp/7lTGeXbBRNRLaVk2MdBjtJ/99c266ed4cb8cc63bd0c388071f01ff6/white-wave-bg.svg' /> */}
            </div>
            <Feature />
            <Footer />
        </div>
    )
}

export default SplashPage
