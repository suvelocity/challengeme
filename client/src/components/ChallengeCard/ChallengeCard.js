import React, { 
    // useCallback,
     useEffect, useState } from "react";
import { Link } from "react-router-dom";
import network from "../../services/network";
import "./ChallengeCard.css";
import Rating from "@material-ui/lab/Rating";

//fallback function to sort the creation time of the repo
// function generateTime(date) {
//     let today = new Date(date);
//     const dd = String(today.getDate()).padStart(2, "0");
//     const mm = String(today.getMonth() + 1).padStart(2, "0");
//     const yyyy = today.getFullYear();
//     today = `${yyyy}-${mm}-${dd}`;
//     return `${today}`;
// }

export default function ChallengeCard({
    name,
    description,
    labels,
    // createdAt,
    repositoryName,
    challengeId,
    rating,
    submissions,
    authorName,
    createdAt
}) {
    const [coverImg, setCoverImg] = useState("");
    const [loading, setLoading] = useState(true);
    // const [date, setDate] = useState(null);

    // //function for getting the last update time
    // const getUpdated = useCallback((date) => {
    //     const dateNow = Date.now();
    //     const updateRepoDate = new Date(date);
    //     let diff = (dateNow - updateRepoDate.getTime()) / 1000 / 60 / 60;
    //     if (diff < 24) {
    //         setDate(`${Math.floor(diff)} Hours ago`);
    //     } else {
    //         diff = diff / 24;
    //         diff = Math.floor(diff);
    //         if (diff < 8) {
    //             setDate(`${Math.floor(diff)} Days ago`);
    //         } else {
    //             diff = Math.floor(diff / 7);
    //             if (diff < 5) {
    //                 setDate(`${Math.floor(diff)} Weeks ago`);
    //             } else {
    //                 diff = Math.floor(diff / 4);
    //                 if (diff < 13) {
    //                     setDate(`${Math.floor(diff)} Months ago`);
    //                 } else {
    //                     diff = Math.floor(diff / 12);
    //                     setDate(`${Math.floor(diff)} Years ago`);
    //                 }
    //             }
    //         }
    //     }
    // }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data: coverImage } = await network.get(`/api/v1/image?id=${challengeId}`);
                setCoverImg(coverImage ? coverImage.img : "");
                setLoading(false);
            //     try {
            //         const { data: repo } = await network.get(
            //             `/api/v1/services/public_repo?repo_name=${repositoryName}`
            //         );
            //         // const updateDate = repo.updated_at;
            //         // getUpdated(updateDate);
            //     } catch (e) {
            //         // setDate(generateTime(createdAt));
            //     }
            } catch (err) {
                console.error(err.message);
            }
        })();
        // eslint-disable-next-line
    }, []);

    return (
        <Link to={`/challenges/${challengeId}`} style={{ textDecoration: "none" }}>
            <div className="challenge-card">
                <div className="chalenge-card-profile-pic">
                    {!loading ? (
                        coverImg.length > 0 && (
                            <img className="challenge-card-img-homepage" src={coverImg} alt=" " />
                        )
                    ) : (
                        <div className="challenge-card-img-homepage-loading"></div>
                    )}
                </div>
                <div className="challenge-card-info">
                    <div className="first-row-container">
                        <span className="challenge-card-title">{name}</span>
                        <div className="labels-container">
                            {
                                //getting the first 2 lables
                                labels.map((label) => {
                                    return (
                                        <span className="home-page-challenge-labels" key={label.id}>
                                            {label.name}
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <div className="second-row-container">
                        <Rating
                            readOnly
                            name="disabled"
                            value={rating ? Math.round(rating) : 0}
                        />
                        <div className="number-of-submissions">{submissions} Submission</div>
                    </div>

                    <div className="challenge-card-description-homepage">
                        {
                            //slicing the description to 100 letters and adding 3 dots if sliced
                            description.length < 100
                                ? description
                                : description.slice(0, 100).split(" ").slice(0, -1).join(" ") +
                                  "..."
                        }
                    </div>
                    <div className="challenge-card-description-homepage">
                        {
                        `${createdAt.split('T')[0]} || by ${authorName}`
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
}
