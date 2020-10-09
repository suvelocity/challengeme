import React, { useEffect, useMemo, useState } from 'react';
import network from "../services/network"
import "./ChallengeCard.css"
import Avatar from "@material-ui/core/Avatar"
import Rating from '@material-ui/lab/Rating';
import { Tooltip } from '@material-ui/core';
import ThemeApi from "../services/Theme"
import {motion} from 'framer-motion'


function generateTime(date) {
  let today = new Date(date)
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return `${today}`;
}

export default function ChallengeCard({
  name,
  description,
  labels,
  createdAt,
  repositoryName,
  challengeId
}) {
  const darkMode = React.useContext(ThemeApi).darkTheme
  const [coverImg,setCoverImg] = useState("")
  const [date,setDate] = useState(null)

  useEffect(()=>{
    (async ()=> {
      try{
        const { data: coverImage } = await network.get(`/api/v1/image?id=${challengeId}`)
        setCoverImg(coverImage?coverImage.img:'')
        try{
          const { data: repo } = await network.get(`/api/v1/challenges/update_date?repo_name=${repositoryName}`)
          const updateDate = repo.updated_at
          setDate(generateTime(updateDate))
        }catch(e){
          setDate(generateTime(createdAt))
        }
      }catch(err){
        console.error(err.message)
      }
 

    })()
  })
  const challengeCardDescriptionStyle = darkMode ? "challenge-card-description-homepage" : "challenge-card-description-homepage-light"
  const avatarStyle = {backgroundColor:darkMode?"#F5AF5D":"#C9AC80",marginRight:10}

  return (
    <motion.div className={darkMode?"dark-challenge-card":"light-challenge-card"}
    initial={{scale:0.03}}
    animate={{ scale: 1 }}
    transition={{default: { duration: 1.2 , delay:0.3}}}
    
    >
      <div className="challenge-card-creator-homepage">
        <Tooltip title={repositoryName.split("/")[0]}>
        <Avatar style={avatarStyle}>{repositoryName.slice(0,2)}</Avatar>
        </Tooltip>

       {name}
        <div>
          {
            labels.slice(0,3).map(label=>{
            return <span className={darkMode?"home-page-challenge-labels-dark":"home-page-challenge-labels-light"} key={label.id}>{label.name}</span>
            })
          }
        </div>
      </div>
      {
      coverImg.length>0&&
      <img className="challenge-card-img-homepage" src={coverImg} />
      }
      <div className="challenge-card-data-homepage">
        {
          date&&
         "Updated at: "+date
        }
        <Rating readOnly name="disabled" value={4}  />
      </div>
      <div className={challengeCardDescriptionStyle}>
        {description.length<100? description : description.slice(0,100).split(" ").slice(0,-1).join(" ")+"..."}
        </div>
    </motion.div>
  );
}