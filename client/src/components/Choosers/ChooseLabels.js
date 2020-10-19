import React, { useEffect, useState } from "react";
import network from "../../services/network";
import Selector from "react-select";
import "./ChooseLabel.css";
const ChooseLabels = ({ submitFilter, darkMode }) => {
    const [labels, setLabels] = useState([]);

    useEffect(
        // gets existing labels
        () => {
            (async () => {
                try {
                    const { data } = await network.get(`/api/v1/labels`);
                    const optionsForSelector = data.map((labelData) => ({
                        value: labelData.id,
                        label: labelData.name,
                    }));
                    setLabels(optionsForSelector);
                } catch {}
            })();
        },
        []
    );

    const selectionChange = (a) => {
        submitFilter(a ? a.map((x) => x.value) : []);
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: "1px dotted black",
            color: darkMode ? "white" : "blue",
            backgroundColor: darkMode ? "rgb(51,51,51)" : "white",
        height: "100%"
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: "neutral30",
        }),
    };
    return (
        <div className="labelFilter">
            <Selector
                className="selectLabels"
                maxMenuHeight={300}
                placeholder="select labels"
                isMulti
                name="labels"
                onChange={selectionChange}
                closeMenuOnSelect={false}
                options={labels}
                styles={customStyles}
            />
        </div>
    );
};

export default ChooseLabels;
