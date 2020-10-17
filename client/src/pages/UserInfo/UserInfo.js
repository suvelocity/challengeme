import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import network from "../../services/network";

function generateTime(date) {
  let today = new Date(date);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return `${today}`;
}

const generateName = (name) => {
  let changedName = "";
  for (let i = 0; i < name.length; i++) {
    i === 0
      ? (changedName += name[i].toUpperCase())
      : (changedName += name[i].toLowerCase());
  }
  return changedName;
};

const getUpdated = (date) => {
  const dateNow = Date.now();
  const userCreationDate = new Date(date);
  let diff = (dateNow - userCreationDate.getTime()) / 1000 / 60 / 60;
  if (diff < 24) {
    return `${Math.floor(diff)} Hours ago`;
  } else {
    diff = diff / 24;
    diff = Math.floor(diff);
    if (diff < 8) {
      return `${Math.floor(diff)} Days ago`;
    } else {
      diff = Math.floor(diff / 7);
      if (diff < 5) {
        return `${Math.floor(diff)} Weeks ago`;
      } else {
        diff = Math.floor(diff / 4);
        if (diff < 13) {
          return `${Math.floor(diff)} Months ago`;
        } else {
          diff = Math.floor(diff / 12);
          return `${Math.floor(diff)} Years ago`;
        }
      }
    }
  }
};

function UserInfo() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const username = Cookies.get("userName");
        const { data: info } = await network.get(
          `/api/v1/user_info/${username}`
        );
        setUserInfo(info[0]);
      } catch {}
    })();
  }, []);
  return userInfo.firstName ? (
    <div style={{ marginTop: 130 }} className='user-info-container'>
      <p>First name: {generateName(userInfo.firstName)}</p>
      <p>Last name: {generateName(userInfo.lastName)}</p>
      <p>Birth Day: {generateTime(userInfo.birthDate)}</p>
      <p>Country: {userInfo.country}</p>
      <p>City: {userInfo.city}</p>
      <p>Github: {userInfo.githubAccount}</p>
      <p>Account Created: {getUpdated(userInfo.createdAt)}</p>
    </div>
  ) : (
    <div></div>
  );
}

export default UserInfo;
