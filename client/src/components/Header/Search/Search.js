import React, { useState, useContext, useCallback } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";
import AllChallenges from "../../../context/AllChallengesContext";
import SearchTicket from "./SearchTicket";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: "37.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    // backgroundColor: "black",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchLight: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgb(219, 219, 219)",
    "&:hover": {
      backgroundColor: "rgb(175, 175, 175)",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "0px",
    transition: "width 2s",
    "&:focus": {
      width: "100%",
    },
    // [theme.breakpoints.up("md")]: {
    //     width: "20ch",
    // },
  },
}));

const Search = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const allChallenges = useContext(AllChallenges).challenges;
  const [searchValue, setSearchValue] = useState("");

  const letterColor = {
    color: darkMode ? "white" : "black",
  };

  //search function to the the challenges
  const search = (e) => {
    setSearchValue(e.target.value);
    let { value } = e.target;
    if (value.length === 0) {
      setSearchValue("");
      return setResults([]);
    }
    try {
      const filteredChallenges = [];
      for (let i = 0; i < allChallenges.length; i++) {
        if (allChallenges[i].name.toLowerCase().includes(value.toLowerCase())) {
          filteredChallenges.push(allChallenges[i]);
        }
      }
      setResults(filteredChallenges);
    } catch (error) {
      console.error(error);
    }
  };

  const closeSearch = useCallback(() => {
    setSearchValue("");
    setResults([]);
  }, []);

  const onSearchLoseFocus = () => {
    setTimeout(() => {
      setResults([]);
      setSearchValue("");
    }, 200)
  };

  const resultsList =
    results &&
    results.length > 0 &&
    results.map((result) => {
      return (
        <SearchTicket
          darkMode={darkMode}
          ticket={result}
          key={result.id}
          closeSearch={closeSearch}
        />
      );
    });
  //search bar item
  const searchInput = (
    <div className={darkMode ? classes.search : classes.searchLight}>
      <div className={classes.searchIcon}>
        <SearchIcon style={letterColor} />
      </div>
      <InputBase
        style={letterColor}
        id={"searchBar"}
        placeholder={"Search..."}
        onChange={search}
        autoComplete="off"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onBlur={onSearchLoseFocus}
        value={searchValue}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
  const SearchContainerStyle = {
    backgroundColor: darkMode ? "rgb(51,51,51)" : "white",
    color: darkMode ? "white" : "black",
  };

  return (
    <>
      <div id="search">{searchInput}</div>
      <Divider />
      <div
        id="searchResults"
        className={results.length !== 0 ? "open" : "closed"}
      >
        <div className="display" style={SearchContainerStyle}>
          {resultsList}
        </div>
      </div>
    </>
  );
};
export default Search;
