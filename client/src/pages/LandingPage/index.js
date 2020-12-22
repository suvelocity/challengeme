import React, { useEffect, useState, useContext } from 'react';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
// import WalkingManIcon from './WalkingManIcon';
import './LandingPage.css';

export default function LandingPage() {
    const [state, setState] = useState()

    useEffect(() => {

        // eslint-disable-next-line
    }, [])

    return (
        <div className='Landing-page-main'>
            Landing Page
            {/* <div className='Vector-3'></div> */}
            <div className='Hacker-walks'>
            {/* <WalkingManIcon /> */}
            </div>
            {/* <div className='Heading-and-Buttons'></div> */}
            {/* <div className='go-like-lines'></div> */}
            {/* <div className='Watch-Video'></div> */}
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