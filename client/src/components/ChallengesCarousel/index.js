import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ChallengeToCarousel from './ChallengeToCarousel';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  868: { items: 3 },
  1228: { items: 4 },
  1500: { items: 5 },
  1800: { items: 6 },
  2100: { items: 7 },
  2400: { items: 8 },
  2700: { items: 9 },
  3000: { items: 10 },
};

function ChallengesCarousel({ challenges, setNewImg, main }) {

  const items = challenges.length > 0 ? challenges.map((challenge) => (
    <ChallengeToCarousel
      key={challenge.id + challenge.name}
      id={challenge.id}
      name={challenge.name}
      author={challenge.Author.userName}
      submissionsCount={challenge.submissionsCount}
      img={challenge.img}
      setNewImg={setNewImg}
      main={main}
    />
  )) : [<h1>Not Found</h1>];

  const renderPrevButton = ({ isDisabled }) => {
    return <button className="Carousel-Prev-Button" ><ArrowBackIosIcon fontSize='large'/></button>;
  };

  const renderNextButton = () => {
    return <button className="Carousel-Next-Button"><ArrowForwardIosIcon fontSize='large'/></button>;
  };


  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <AliceCarousel
        disableDotsControls
        infinite
        mouseTracking
        items={items}
        responsive={responsive}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
      />
    </div>
  );
}

export default React.memo(ChallengesCarousel);