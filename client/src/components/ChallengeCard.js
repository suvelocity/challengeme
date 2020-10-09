import React, { useEffect, useState } from 'react';
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
  repositoryName,
  challengeId,
}) {
  const darkMode = React.useContext(ThemeApi).darkTheme
  const [coverImg,setCoverImg] = useState("")
  const [date,setDate] = useState(null)

  useEffect(()=>{
    (async ()=> {
      const { data: coverImage } = await network.get(`/api/v1/image?id=${challengeId}`)
      setCoverImg(coverImage.img)
      const { data: repo } = await network.get(`https://api.github.com/repos/${repositoryName}`)
      const updateDate = repo.updated_at
      setDate(generateTime(updateDate))

    })()
  })

  return (
    <motion.div className={darkMode?"dark-challenge-card":"light-challenge-card"}
    initial={{scale:0.03}}
    animate={{ scale: 1 }}
    transition={{default: { duration: 1.2 }}}
    
    >
      <div className="challenge-card-creator-homepage">
        <Tooltip title={repositoryName.split("/")[0]}>
        <Avatar style={{backgroundColor:"#F5AF5D",marginRight:50}}>{repositoryName.slice(0,2)}</Avatar>
        </Tooltip>
        <div>{name}</div>
      </div>
      {
      coverImg.length>0&&
      <img className="challenge-card-img-homepage" src={coverImg} />
      }
      <div className="challenge-card-data-homepage">
        <div>

        {
          date&&
          "Last update: " + date 
        }
        </div>
        <Rating readOnly name="disabled" value={4}  />
      </div>
      <div className={darkMode?"challenge-card-description-homepage":"challenge-card-description-homepage-light"}>
        {/* description.slice(0,100) */}
        word-wrap: break-word ssssssssssssssssssssssssssssshas been replaced with overflow-wrap: brsseask-wo      
        </div>
    </motion.div>
  );
}