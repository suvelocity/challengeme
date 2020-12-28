
import React from 'react';
import ChallengeToCarousel from './ChallengeToCarousel';

function ChallengesCarousel({ challenges }) {
    return (
        <Carousel className='OneArtistAlbums' color="white" breakPoints={breakPoints} >
            {challenges.map((challenge) =>
                <ChallengeToCarousel
                    id={challenge.id}
                    name={challenge.name}
                    author={challenge.User.userName}
                    submissionsCount={challenge.ratingCount}
                />
            )}
        </Carousel>
    )
}

export default ChallengesCarousel;
