import React, { useEffect, useState, useContext } from 'react';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import WalkingManIcon from './WalkingManIcon';
import Title from './Title';
import Stripes from './Stripes';
import './LandingPage.css';

export default function LandingPage() {
    const [state, setState] = useState()

    useEffect(() => {

        // eslint-disable-next-line
    }, [])

    return (
        <div className='Landing-page-main'>
            <section className='Landing-page-title'>
                <Title />
                <p className='Landing-page-under-title-paragraph' >
                    Dont limit your challenges
                    Challenge your Limits
            </p>
            </section  >
            <div className='Landing-page-Vector' />
            <section className='Landing-page-View'  >
                <div className='Landing-page-View-content'  >
                    <h2>Up for the Challenge?</h2>
                    <p>ChallengeMe is your best choice if you wish to master
                    your coding skill, manage your class tasks and creating
                      new challenges with many feauture’s to come</p>
                    <div style={{ display: 'flex' }}>
                        <button>Get started</button>
                        <button>Learn more</button>
                    </div>
                </div>
                <div className='Landing-page-View-Hacker-walks'>
                    <WalkingManIcon />
                </div>
            </section>
            <span className='Landing-page-stripes'>
                <Stripes />
            </span>
            <button className='Landing-page-Watch-Video'>Watch Video</button>
            {/* <div className='Heading-and-Buttons'></div> */}
            {/* <div className='Card-explanation-section'></div> */}
            {/* <div className='Auto-Layout'></div> */}
            {/* <div className='Its-Open-Source'></div> */}
            {/* <div className='Dont-limit-your-challenges-Challenge-your-Limits'></div> */}
            {/* <div className='Auto-Layout1'></div> */}
            {/* <div className='NavbarII'></div> */}
            {/* <div className='Project-Leaders'></div> */}
            {/* <div className='Contribute-Section'></div> */}
            {/* <div className='image-5'></div> */}
            {/* <div className='image-6'></div> */}
        </div>
    );
}