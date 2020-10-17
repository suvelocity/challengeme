import React, { useEffect, useState } from "react";
import network from "../../services/network";
import Selector from "react-select";
import "./ChooseLabel.css";
const ChooseLabels = ({ submitFilter }) => {
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
                    console.log(data);
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
            color: "blue",
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: "neutral30",
            color: "white",
            //     // none of react-select's styles are passed to <Control />
            //     width: 400,
        }),
        // singleValue: (provided, state) => {
        //     const opacity = state.isDisabled ? 0.5 : 1;
        //     const transition = "opacity 300ms";

        // return { ...provided, opacity, transition };
        // },
    };
    return (
        <div className="labelFilter">
            <Selector
                className="selectLabels"
                maxMenuHeight={100}
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
