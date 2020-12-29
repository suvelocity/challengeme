import React, { useEffect, useState, useContext } from "react";
import mixpanel from "mixpanel-browser";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AllChallenges from "../../context/AllChallengesContext";
import FilteredLabels from "../../context/FilteredLabelsContext";
import network from "../../services/network";
import ChooseLabels from "../../components/Choosers/ChooseLabels";
import ChallengesCarousel from "../../components/ChallengesCarousel";
import "../../styles/Home.css";

export default function Home() {
  const allChallenges = useContext(AllChallenges).challenges;
  const filteredLabels = useContext(FilteredLabels);
  const [challengesFiltered, setChallengesFiltered] = useState(allChallenges);
  const [labels, setLabels] = useState([]);
  const [chooseLabels, setChooseLabels] = useState([]);
  const currentLocation = useLocation();

  const getLabels = async () => {
    try {
      const { data } = await network.get("/api/v1/labels");
      const optionsForSelector = data.map((labelData) => ({
        value: labelData.id,
        label: labelData.name,
      }));
      setChooseLabels(optionsForSelector);
      const newFilter = optionsForSelector.filter((label) => {
        console.log(label);
        return (
          label.value ===
          (filteredLabels ? filteredLabels.filteredLabels[0] : null)
        );
      });
      console.log(newFilter);
      setLabels(newFilter);
    } catch (error) { }
  };

  useEffect(() => {
    const user = Cookies.get("userName");
    mixpanel.track("User On Home Page", { User: `${user}` });
    return () => filteredLabels.setFilteredLabels([]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentLocation.pathname !== "/challenges") {
      setLabels([]);
    } else {
      getLabels();
    }
    // eslint-disable-next-line
  }, [currentLocation]);

  useEffect(() => {
    (async () => {
      try {
        if (filteredLabels.filteredLabels.length > 0) {
          const filteredByLabelChallenges = [];
          allChallenges.forEach((challenge) => {
            if (
              filteredLabels.filteredLabels.every((labelChallenge) =>
                challenge.Labels.map((label) => label.id).includes(
                  labelChallenge
                )
              )
            ) {
              if (!filteredByLabelChallenges.includes(challenge)) {
                filteredByLabelChallenges.push(challenge);
              }
            }
          });
          setChallengesFiltered(filteredByLabelChallenges);
        } else {
          setChallengesFiltered(allChallenges);
        }
      } catch (error) { }
    })();
    // eslint-disable-next-line
  }, [filteredLabels]);

  return (
    <div className="home-page">
      <div className="All-Challenge-Image-Container">
        <div className="All-Challenge-Title-Container">
          <h1>Explore Your Kind Of challenge</h1>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ minWidth: "150px", width: "fit-content" }}>
          <ChooseLabels
            labels={labels}
            chooseLabels={chooseLabels}
            setChooseLabels={setChooseLabels}
            // darkMode={darkMode}
            setLabels={setLabels}
          />
        </div>
        <Button
          onClick={() => {
            filteredLabels.setFilteredLabels(
              labels ? labels.map((label) => label.value) : []
            );
          }}
          variant="contained"
        //   className={darkMode ? classes.filterButtonDark : classes.filterButton}
        >
          filter
        </Button>
      </div>
      <div className="All-Challenge-Challenges-Container">
        <div className="All-Challenge-Carousel">
          <p>Recommended For You:</p>
          {challengesFiltered.length > 0 ? (
            <ChallengesCarousel challenges={challengesFiltered} />
          ) : (
              <h1>Not Found</h1>
            )}
        </div>
        <div className="All-Challenge-Carousel">
          <p>Front End Challenges:</p>
          {challengesFiltered.length > 0 ? (
            <ChallengesCarousel
              challenges={challengesFiltered.filter(
                (challenge) => challenge.type === "client-only"
              )}
            />
          ) : (
              <h1>Not Found</h1>
            )}
        </div>
        <div className="All-Challenge-Carousel">
          <p>Back End Challenges:</p>
          {challengesFiltered.length > 0 ? (
            <ChallengesCarousel
              challenges={challengesFiltered.filter(
                (challenge) =>
                  challenge.type === "server-mysql" ||
                  challenge.type === "server-only"
              )}
            />
          ) : (
              <h1>Not Found</h1>
            )}
        </div>
        <div className="All-Challenge-Carousel">
          <p>Full Stack Challenges:</p>
          {challengesFiltered.length > 0 ? (
            <ChallengesCarousel
              challenges={challengesFiltered.filter(
                (challenge) => challenge.type === "fullstack"
              )}
            />
          ) : (
              <h1>Not Found</h1>
            )}
        </div>
      </div>
    </div>
  );
}
