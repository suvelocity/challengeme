import React, { useEffect, useState } from 'react';
import network from "../services/network"


export default function ChallengeCard({
  name,
  description,
  repositoryName,
  cover,
  challengeId,
  onApply,
  createdAt
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [coverImg,setCoverImg] = useState("")
  useEffect(()=>{
    (async ()=> {
      const { data: coverImage } = await network.get(`/api/v1/image?id=${challengeId}`)
      setCoverImg(coverImage.img)
    })()
  })

  return (
    <div className={""}>
      {name}
      {
      coverImg.length>0&&
      <img src={coverImg} />
      }
    </div>
  );
}