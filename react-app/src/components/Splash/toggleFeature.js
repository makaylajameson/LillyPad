import React, { useState } from 'react';
import boards from '../../assets/trello_boards.png';
import lists from '../../assets/trello_lists.png';
import cards from '../../assets/trello_cards.png';
import './SplashPage.css';


function Feature() {

    const [selected, setSelected] = useState('Boards');

    return (
        <div className='feature-container'>
            <div className=''>
                <h3 className='feature-title'>LillyPad Tips:</h3>
                <h1 className='feature-title-h1'>A productivity powerhouse</h1>
                <p className='p3'>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who`s doing what and what needs to get done.</p>
                <div className='toggle-container'>
                    <div className='toggle-options'>
                        <div onClick={() => setSelected('Boards')} className={`p ${selected === 'Boards' && 'active-toggle a-color'}`}>
                            <p className='toggle-name'>Boards</p>
                            <p className='feature-inner-text'>
                                LillyPad boards keep tasks organized and
                                work moving forward. In a glace, see
                                everything from "In Progress" to "Done".
                            </p>
                        </div>
                        <div onClick={() => setSelected('Lists')} className={`p ${selected === 'Lists' && 'active-toggle b-color'}`}>
                            <p className='toggle-name'>Lists</p>
                            <p className='feature-inner-text'>
                                The different stages of a task. Start as
                                simple as To Do, Doing or Done-or build
                                a workflow custom fit to your team's
                                needs.
                            </p>
                        </div>
                        <div onClick={() => setSelected('Cards')} className={`p ${selected === 'Cards' && 'active-toggle c-color'}`}>
                            <p className='toggle-name'>Cards</p>
                            <p className='feature-inner-text'>
                                Cards represent tasks and ideas and
                                hold all the information to get the job
                                done. As you make progress, move cards
                                across lists to show their status.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img alt='Boards' src={selected === 'Boards' ? boards : selected === 'Lists' ? lists : cards} className='toggle-img' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature
