import React, { useEffect } from "react";
import Selector from "react-select";
import network from "../../services/network";
import "./ChooseLabel.css";

const ChooseLabels = ({
  labels,
  chooseLabels,
  setChooseLabels,
  setLabels,
  darkMode,
}) => {
  useEffect(
    // gets existing labels
    () => {
      (async () => {
        try {
          const { data } = await network.get("/api/v1/labels");
          const optionsForSelector = data.map((labelData) => ({
            value: labelData.id,
            label: labelData.name,
          }));
          setChooseLabels(optionsForSelector);
        } catch (error) {}
      })();
    },
    [setChooseLabels]
  );

  const selectionChange = (choosens) => {
    setLabels(choosens);
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      border: "1px solid black",
      borderRadius: "3px",
      color: darkMode ? "white" : "black",
      fontWeight: "bold",
      // backgroundColor: darkMode ? "rgb(51,51,51)" : "white",
      width: 100,
      boxSizing: "border-box",
      margin: 3,
      backgroundColor: "rgba(30, 61, 91,0.5)",
      ":hover": {
        backgroundColor: "#1E3D5B",
        color: "white",
      },
      minHeight: 60,
    }),
    menu: (provided) => ({
      ...provided,
      width: 350,
      paddingLeft: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      display: "flex",
      flexWrap: "wrap",
    }),
    control: (provided) =>
      darkMode
        ? {
            ...provided,
            backgroundColor: "neutral30",
          }
        : {
            ...provided,
          },
  };
  return (
    <div className="labelFilter">
      <Selector
        value={labels}
        className="selectLabels"
        maxMenuHeight={300}
        placeholder="select labels"
        isMulti
        name="labels"
        onChange={selectionChange}
        closeMenuOnSelect={false}
        options={chooseLabels}
        styles={customStyles}
      />
    </div>
  );
};

export default ChooseLabels;
