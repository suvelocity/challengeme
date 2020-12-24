import React from 'react';
import { Link } from "react-router-dom";
import WalkingManIcon from './SvgComponents/WalkingManIcon';
import Title from './SvgComponents/Title';
import Stripes from './SvgComponents/Stripes';
import Section from './Cards/Section';
import ProjectLeader from './Cards/ProjectLeader';
import Contributor from './Cards/Contributor';
import Student from './SvgComponents/Student';
import ChallengeMySelf from './SvgComponents/ChallengeMySelf';
import Teams from './SvgComponents/Teams';
import TeacherAnalytics from './SvgComponents/TeacherAnalytics';
import Boss from './SvgComponents/Boss'
import Webhook from './SvgComponents/Webhook'
import Board from './SvgComponents/Board';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import './LandingPage.css';

export default function LandingPage() {

    const SectionsCards = [
        {
            head: 'Challenge yourself',
            content: `Learn and Engage with challenges made by developers, for developers.

            Test based challenges in a variety of topics and levels, each designed to teach and broaden you understanding of code and Industry practices`,
            picture: <ChallengeMySelf />
        },
        {
            head: 'Challenge your team',
            content: `Create and manage a team on ChallengeMe for your students, friends, or colleagues. 

            Learn together and compete against each other to become better codders. 
            
            Use ChallengeMe's extensive analytic systems to track your team's progress and qualifications`,
            picture: <Teams />
        },
        {
            head: 'Challenge Others',
            content: `Create[link to guide] Your own challenges for others to learn from and enjoy.

            practice good test practices and make something for the world to see` ,
            picture: <TeacherAnalytics />
        },
        {
            head: 'Interview Candidate',
            content: `- Interview with ChallengeMe

            Create a challenge for a limited time and use it to test the mettle of potential recruits.
            Test them not only on their coding abilities, but also on how familiar they are with tests and git flow.`,
            picture: <Boss />
        },
        {
            head: 'Integrate with ChallengeMe',
            content: `You can use http requests to Create and manage teams (eg. classes) on the ChallengeMe system.
            These teams have users defined as teachers that can add other users to the team.`,
            picture: <Teams />
        },
        {
            head: 'Webhook - Stay up to date ',
            content: `In order to receive updates on events in the ChallengeMe system you have to register a webhook on our system that will send you updates as events happen, to a given address.`,
            picture: <Webhook />
        }
    ]

    const projectLeaders = [
        {
            icon: 'https://media-exp1.licdn.com/dms/image/C5635AQGtg-CmTPOa5w/profile-framedphoto-shrink_200_200/0/1605426981590?e=1608753600&v=beta&t=bL2Ss4-UVme-k5-ZVpLdr_ZltvdsPwTzpCBnL4v54Dk',
            name: 'David Diamant',
            rule: 'Project Main Leader',
            content: `As a developer who was looking to break into Tech, I knew the underlying logic of programming, but I had a lot of gaps in my understanding, especially on the types of algorithms questions asked at interviews. I can confidently say that ChallengeMe is one of the best resources out there for challenge yourself and others, with fantastic video tutorials and an excellent question selection that allows you to get a deep understanding of the topics and confidence in your problem solving ability. The site is incredibly intuitive to use and I think the staff are some of the best out there, being incredibly supportive and passionate about offering a great customer experience. I can not recommend ChallengeMe highly enough.
            `,
            linkedin: 'davidiamant',
            github: 'david35008'
        },
        {
            icon: 'https://media-exp1.licdn.com/dms/image/C4E35AQEUumDeyAuetw/profile-framedphoto-shrink_200_200/0/1604073201265?e=1608753600&v=beta&t=bKbFqRbwuOE9Arl85haenkiThpT6rWU5khFqU6X1qJk',
            name: 'Roy Shnitzer',
            rule: 'Project Main Leader',
            content: `ChallengeMe has been the backbone of preparing my technical coding skills. This allows you to work efficiently on the most common variations of the highest WEB development without having to spend hours battling the algorithm just to arrive at an inefficient or incorrect solution. There are plenty of resources available for rehearsal, but ChallengeMe differentiates its product by providing the 'how' and 'why' in clear and concise videos. Developing a deeper understanding of how to approach these issues is better than trying to memorize lines of code. I highly recommend ChallengeMe.
            `,
            linkedin: 'roy-shnitzer-1080671b7',
            github: 'RoyShnitzel'
        },
        {
            icon: 'https://media-exp1.licdn.com/dms/image/C4D03AQHitfXfdK1h_Q/profile-displayphoto-shrink_200_200/0/1517597484023?e=1614211200&v=beta&t=QhESfo63QFM3E89UG-LQoSANWQXf3lgaDBeWYU4_2qk',
            name: 'Guy Serfaty',
            rule: 'Moderator',
            content: `I'm just writing to thank you for this product. I had failed in so many technologies before, but I wanted to get into a top tech company so much that I even enrolled in a Master's program. Even then, I was unsure if I had what it takes to make it. From the moment I heard your first video explanation, I thought 'this is exactly the way to learn new technology' (plus the extra points you can grab by asking clarifying questions). After a few months of studying, mainly on ChallengeMe , I got offers to intern at Microsoft and Google!
            ` ,
            linkedin: 'guy-serfaty-aa34b413a',
            github: 'GuySerfaty'
        }
    ]

    const contributors = [
        {
            icon: 'https://media-exp1.licdn.com/dms/image/C4E35AQG0EjerwTpj_g/profile-framedphoto-shrink_200_200/0/1606295533050?e=1608757200&v=beta&t=-zIfQuTU9Oa6afmDkK2zHt70HoRcF7Diw_TW0ps6YYs',
            name: 'Dor Kachlon',
            github: 'DorKachlon',
        },
        {
            icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'Alon Bruk',
            github: 'AlonBru',
        },
        {
            icon: 'https://media-exp1.licdn.com/dms/image/C4E03AQHC42ZPhrq_aQ/profile-displayphoto-shrink_200_200/0/1604991996965?e=1614211200&v=beta&t=CfAxKwq6pJVUrj9-5wadH8XAyKBRFrEpmXehmO0mafg',
            name: 'Tsach Ovadia',
            github: 'ItsDrTsach',
        }
    ]

    const footerLabels = [
        {
            name: 'Contact Us',
            link: ''
        },
        {
            name: '|'
        },

        {
            name: 'FAQ',
            link: ''
        },
        {
            name: '|'
        },
        {
            name: 'Reviews',
            link: ''
        },
        {
            name: '|'
        },
        {
            name: 'Legal Stuff',
            link: ''
        },
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
                    <div className='Landing-page-View-Buttons'>
                        <Link to='/challenges' className='Landing-page-View-GetStarted' >Get started</Link>
                        <a href='https://suvelocity.github.io/challengeme/Guides/getting-started.html' target="_blank" className='Landing-page-View-Learn-More'>Learn more</a>
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
                <a href='https://github.com/suvelocity/challengeme' target="_blank" className='Landing-page-Open-Source-Button' >Join the Team
                   <IconButton>
                        <GitHubIcon style={{ color: 'white' }} />
                    </IconButton></a>
            </section>
            <section className='Landing-page-Project-Leaders' >
                <h2 className='Landing-page-Project-Leaders-H2'>Project Leaders</h2>
                <div className='Landing-page-Project-Leaders-Cards'>
                    {projectLeaders.map(elem =>
                        < ProjectLeader
                            icon={elem.icon}
                            name={elem.name}
                            rule={elem.rule}
                            content={elem.content}
                            linkedin={elem.linkedin}
                            github={elem.github}
                        />)
                    }
                </div>
            </section>
            <section className='Landing-page-Contributors' >
                <h2 className='Landing-page-Contributors-H2'>Contributors</h2>
                <div className='Landing-page-Contributors-Cards'>
                    {contributors.map(elem =>
                        < Contributor icon={elem.icon} name={elem.name} github={elem.github} />)
                    }
                </div>
            </section>
            <section className='Landing-page-Build-Your-Own-Challenge'  >
                <div className='Landing-page-Build-Your-Own-Challenge-Board'>
                    <Board />
                </div>
                <div className='Landing-page-Build-Your-Own-Challenge-content'  >
                    <h2>Build Your Own Challenge?</h2>
                    <p>ChallengeMe is your best choice if you wish to master
                    your coding skill, manage your class tasks and creating
                      new challenges with many feauture’s to come</p>
                    <div className='Landing-page-Build-Your-Own-Challenge-Buttons'>
                        <Link to='/AddNewChallenge' className='Landing-page-Build-Your-Own-Challenge-GetStarted' >Get started</Link>
                        <a href='https://suvelocity.github.io/challengeme/Guides/addChallenge.html' target="_blank" className='Landing-page-Build-Your-Own-Challenge-Learn-More'>Learn more</a>
                    </div>
                </div>

            </section>
            <section className='Landing-page-Footer' >
                <div className='Landing-page-Footer-Labels' >
                    {footerLabels.map((label, index) =>
                        <Link className='Landing-page-Footer-Single-Label' to={`/${label.link}`}>{label.name}</Link>
                    )}
                </div>
                <p> Copyright © 2020 David And Shnitzer, Will allays love each other. All rights reserved. </p>

            </section>
        </div>
    );
}