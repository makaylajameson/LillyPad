import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='person-container'>
                <p className='footer-title'>Built By: Makayla Jameson</p>
                <div className='link-container'>
                    <a target='' href='https://www.linkedin.com/in/makayla-jameson-701b47164/'><i class="fab fa-linkedin"></i></a>
                    <a target='' href='https://github.com/makaylajameson'><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Footer
