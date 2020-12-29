import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import WalkingManIcon from './SvgComponents/WalkingManIcon';
import Title from './SvgComponents/Title';
import Stripes from './SvgComponents/Stripes';
import Section from './Cards/Section';
import ProjectLeader from './Cards/ProjectLeader';
import Contributor from './Cards/Contributor';
import Integration from './SvgComponents/Integration';
import ChallengeMySelf from './SvgComponents/ChallengeMySelf';
import Teams from './SvgComponents/Teams';
import TeacherAnalytics from './SvgComponents/TeacherAnalytics';
import Boss from './SvgComponents/Boss';
import Webhook from './SvgComponents/Webhook';
import CreateChallenge from './SvgComponents/CreateChallenge';
import Footer from '../../components/Footer';
import '../../styles/LandingPage.css';

export default function LandingPage() {
  const SectionsCards = [
    {
      head: 'Challenge yourself',
      content: `Learn and Engage with challenges made by developers, for developers.
            Test based challenges in a variety of topics and levels,
             each designed to teach and broaden you understanding of code and Industry practices`,
      picture: <ChallengeMySelf />,
      link: '/challenges',
    },
    {
      head: 'Challenge your team',
      content: `Create and manage a team on ChallengeMe for your student, friends, or colleagues. 
            Learn together and compete against each other to become better codders. 
            Use ChallengeMe's extensive analytic systems to track your team's progress and qualifications`,
      picture: <Teams />,
      link: '/teams',
    },
    {
      head: 'Challenge Others',
      content: `Create Your own challenges for others to learn from and enjoy.
            practice good test practices and make something for the world to see`,
      picture: <TeacherAnalytics />,
      link: '/teams',
    },
    {
      head: 'Interview Candidate',
      content: `Create a challenge for a limited time and use it to test the mettle of potential recruits.
            Test them not only on their coding abilities, but also on how familiar they are with tests and git flow.`,
      picture: <Boss />,
    },
    {
      head: 'Integrate with ChallengeMe',
      content: `Use our exposed team creation API to Create and manage teams (eg. classes) on the ChallengeMe system.
            Define users as team leaders to allow them to manage the teams, view statistics and more.`,
      picture: <Integration />,
      href: 'https://suvelocity.github.io/challengeme/API/teams.html',
    },
    {
      head: 'Webhook - Stay up to date ',
      content: `Receive updates on events in the ChallengeMe system related to you and your team. 
            register a webhook on our system that will send http requests to a given address with updates on events as they happen.`,
      picture: <Webhook />,
      href: 'https://suvelocity.github.io/challengeme/API/webhooks.html',
    },
  ];

  const projectLeaders = [
    {
      icon:
        'https://media-exp1.licdn.com/dms/image/C5635AQGtg-CmTPOa5w/profile-framedphoto-shrink_400_400/0/1605426981590?e=1609311600&v=beta&t=qfwtIcURvuoQ9TmvVJNS-eDduHz6t883BjdCvEoArhQ',
      name: 'David Diamant',
      rule: 'Project Main Leader',
      content: `As a developer who was looking to break into Tech, I knew the underlying logic of programming, but I had a lot of gaps in my understanding, especially on the types of algorithms questions asked at interviews. I can confidently say that ChallengeMe is one of the best resources out there for challenge yourself and others, with fantastic video tutorials and an excellent question selection that allows you to get a deep understanding of the topics and confidence in your problem solving ability. The site is incredibly intuitive to use and I think the staff are some of the best out there, being incredibly supportive and passionate about offering a great customer experience. I can not recommend ChallengeMe highly enough.
            `,
      linkedin: 'davidiamant',
      github: 'david35008',
    },
    {
      icon:
        'https://media-exp1.licdn.com/dms/image/C4E35AQEUumDeyAuetw/profile-framedphoto-shrink_400_400/0/1604073201265?e=1609311600&v=beta&t=hW-JpI4hC1Yy4C3y-ulFWJz1Fr3ZhPMJ8GiImpbSmBs',
      name: 'Roy Shnitzer',
      rule: 'Project Main Leader',
      content: `ChallengeMe has been the backbone of preparing my technical coding skills. This allows you to work efficiently on the most common variations of the highest WEB development without having to spend hours battling the algorithm just to arrive at an inefficient or incorrect solution. There are plenty of resources available for rehearsal, but ChallengeMe differentiates its product by providing the 'how' and 'why' in clear and concise videos. Developing a deeper understanding of how to approach these issues is better than trying to memorize lines of code. I highly recommend ChallengeMe.
            `,
      linkedin: 'roy-shnitzer-1080671b7',
      github: 'RoyShnitzel',
    },
    {
      icon:
        'https://media-exp1.licdn.com/dms/image/C4D03AQHitfXfdK1h_Q/profile-displayphoto-shrink_200_200/0/1517597484023?e=1614211200&v=beta&t=QhESfo63QFM3E89UG-LQoSANWQXf3lgaDBeWYU4_2qk',
      name: 'Guy Serfaty',
      rule: 'Moderator',
      content: `I'm just writing to thank you for this product. I had failed in so many technologies before, but I wanted to get into a top tech company so much that I even enrolled in a Master's program. Even then, I was unsure if I had what it takes to make it. From the moment I heard your first video explanation, I thought 'this is exactly the way to learn new technology' (plus the extra points you can grab by asking clarifying questions). After a few months of studying, mainly on ChallengeMe , I got offers to intern at Microsoft and Google!
            `,
      linkedin: 'guy-serfaty-aa34b413a',
      github: 'GuySerfaty',
    },
  ];

  const contributors = [
    {
      icon:
        'https://media-exp1.licdn.com/dms/image/C4E35AQG0EjerwTpj_g/profile-framedphoto-shrink_400_400/0/1606295533050?e=1609311600&v=beta&t=PRNVyiHll0OrVUKvRlLliP2Ljh4JFMby3ZlaxdRThb4',
      name: 'Dor Kachlon',
      github: 'DorKachlon',
    },
    {
      icon:
        'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg',
      name: 'Alon Bruk',
      github: 'AlonBru',
    },
    {
      icon:
        'https://media-exp1.licdn.com/dms/image/C4E03AQHC42ZPhrq_aQ/profile-displayphoto-shrink_200_200/0/1604991996965?e=1614211200&v=beta&t=CfAxKwq6pJVUrj9-5wadH8XAyKBRFrEpmXehmO0mafg',
      name: 'Tsach Ovadia',
      github: 'ItsDrTsach',
    },
  ];

  return (
    <div className="Landing-page-main">
      <section className="Landing-page-title">
        <Title />
        <p className="Landing-page-under-title-paragraph">
          Dont limit your challenges Challenge your Limits
        </p>
      </section>
      <div className="Landing-page-Vector" />
      <section className="Landing-page-View">
        <div className="Landing-page-View-content">
          <h2>Up for the Challenge?</h2>
          <p>
            ChallengeMe is your best choice if you wish to master your coding
            skill, manage your class tasks and creating new challenges with many
            feauture’s to come
          </p>
          <div className="Landing-page-View-Buttons">
            <Link to="/challenges" className="Landing-page-View-GetStarted">
              Get started
            </Link>
            <a
              href="https://suvelocity.github.io/challengeme/Guides/getting-started.html"
              target="_blank"
              rel="noopener noreferrer"
              className="Landing-page-View-Learn-More"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="Landing-page-View-Hacker-walks">
          <WalkingManIcon />
        </div>
      </section>
      <span className="Landing-page-stripes">
        <Stripes />
      </span>
      <button className="Landing-page-Watch-Video">Watch Video</button>
      <section className="Landing-page-Sections-Cards">
        {SectionsCards.map((elem, i) => (
          <Section
            key={elem.head}
            head={elem.head}
            content={elem.content}
            picture={elem.picture}
            link={elem.link}
            href={elem.href}
          />
        ))}
      </section>
      <section className="Landing-page-Open-Source">
        <h2 className="Landing-page-Open-Source-H2">
          Hey... It’s an Open Source Project!
        </h2>
        <p className="Landing-page-Open-Source-P">
          ChallengeMe's source code is freely available to view, study and
          contribute to. This means you are free to use it as a base for your
          learning, as a class project or most anything else, and if you do a
          good enough job, your contributions could even be accepted into the
          Site. Our extensive CI/CD system ensures that any additions made will
          not be breaking, so you can rest assured that your contribution will
          not do any damage.
        </p>
        <a
          href="https://github.com/suvelocity/challengeme"
          target="_blank"
          rel="noopener noreferrer"
          className="Landing-page-Open-Source-Button"
        >
          Join the Team
          <IconButton>
            <GitHubIcon style={{ color: 'white' }} />
          </IconButton>
        </a>
      </section>
      <section className="Landing-page-Project-Leaders">
        <h2 className="Landing-page-Project-Leaders-H2">Project Leaders</h2>
        <div className="Landing-page-Project-Leaders-Cards">
          {projectLeaders.map((elem) => (
            <ProjectLeader
              key={elem.content}
              icon={elem.icon}
              name={elem.name}
              rule={elem.rule}
              content={elem.content}
              linkedin={elem.linkedin}
              github={elem.github}
            />
          ))}
        </div>
      </section>
      <section className="Landing-page-Contributors">
        <h2 className="Landing-page-Contributors-H2">Contributors</h2>
        <div className="Landing-page-Contributors-Cards">
          {contributors.map((elem) => (
            <Contributor
              key={elem.name}
              icon={elem.icon}
              name={elem.name}
              github={elem.github}
            />
          ))}
        </div>
      </section>
      <section className="Landing-page-Build-Your-Own-Challenge">
        <div className="Landing-page-Build-Your-Own-Challenge-Board">
          <CreateChallenge />
        </div>
        <div className="Landing-page-Build-Your-Own-Challenge-content">
          <h2>Build Your Own Challenge?</h2>
          <p>
            ChallengeMe is the open-source, test based code learning program.
            Test based challenges work with industry standard technologies
            commonly found as part of QA and CI/CD systems, to check if
            submitted code holds up to scrutiny. You can create challenges and
            make them fit your needs exactly, to teach, test or evaluate the
            skills of prospective employees. If you or you team want to learn,
            teach or challenge yourselves in the world of software and web
            development, ChallengeMe is the way to go.
          </p>
          <div className="Landing-page-Build-Your-Own-Challenge-Buttons">
            <Link
              to="/AddNewChallenge"
              className="Landing-page-Build-Your-Own-Challenge-GetStarted"
            >
              Get started
            </Link>
            <a
              href="https://suvelocity.github.io/challengeme/Guides/addChallenge.html"
              target="_blank"
              rel="noopener noreferrer"
              className="Landing-page-Build-Your-Own-Challenge-Learn-More"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
