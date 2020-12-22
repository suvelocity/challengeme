import React, { useEffect, useState, useContext } from 'react';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import WalkingManIcon from './SvgComponents/WalkingManIcon';
import Title from './SvgComponents/Title';
import Stripes from './SvgComponents/Stripes';
import Section from './Cards/Section';
import Student from './SvgComponents/Student';
import Teams from './SvgComponents/Teams';
import TeacherAnalytics from './SvgComponents/TeacherAnalytics';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import './LandingPage.css';

export default function LandingPage() {
    // const [state, setState] = useState()

    // useEffect(() => {

    //     // eslint-disable-next-line
    // }, [])

    const SectionsCards = [
        {
            head: 'Student',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ullam consequuntur amet reprehenderit unde tenetur saepe fuga nobis voluptatum ipsam reiciendis est nemo dolorem molestias, molestiae ipsum minus quas eaque?
            `,
            picture: <Student />
        },
        {
            head: 'Teams',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ullam consequuntur amet reprehenderit unde tenetur saepe fuga nobis voluptatum ipsam reiciendis est nemo dolorem molestias, molestiae ipsum minus quas eaque?
            `,
            picture: <Teams />
        },
        {
            head: 'Teacher and Analytics',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ullam consequuntur amet reprehenderit unde tenetur saepe fuga nobis voluptatum ipsam reiciendis est nemo dolorem molestias, molestiae ipsum minus quas eaque?
            ` ,
            picture: <TeacherAnalytics />
        }
    ]

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
            <suction className='Landing-page-Sections-Cards' >
                {SectionsCards.map(elem =>
                    < Section head={elem.head} content={elem.content} picture={elem.picture} />)
                }
            </suction>
            <section className='Landing-page-Open-Source' >
                <h2 className='Landing-page-Open-Source-H2'>Hey... It’s  an Open Source Project!</h2>
                <p className='Landing-page-Open-Source-P'>Lorem ipsum dolor sit amet consecrator
                adipisicing elit. Porro ullam consequuntur
                amet reprehenderit unde tenetur saepe
                fuga nobis voluptatum ipsam reiciendis est
                nemo dolorem molestias, molestiae ipsum
                        minus quas eaque?</p>
                <button className='Landing-page-Open-Source-Button' >Join the Team
                   <IconButton>
                        <GitHubIcon style={{ color: 'white' }} />
                    </IconButton></button>
            </section>

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